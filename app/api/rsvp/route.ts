import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyTyc98JXG9xj2BDlu-TtwEMgR-bInqxxC4MspBx62guQ7Mp0IXZbVhvJsydi5H6dtRNA/exec';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Anti-spam honeypot check
    // If the "website" field is filled, it's likely a bot
    if (body.website && body.website.trim() !== '') {
      // Silently return success without forwarding to Google Sheets
      return NextResponse.json({ ok: true, message: 'Înregistrat cu succes' });
    }

    // Validate required fields
    if (!body.attending) {
      return NextResponse.json(
        { ok: false, error: 'Te rugăm să selectezi dacă vei participa' },
        { status: 400 }
      );
    }

    // If attending is "yes", name is required
    if (body.attending === 'yes' && (!body.name || body.name.trim() === '')) {
      return NextResponse.json(
        { ok: false, error: 'Te rugăm să introduci numele tău' },
        { status: 400 }
      );
    }

    // Prepare payload for Google Sheets
    const payload = {
      attending: body.attending,
      name: body.name || '',
      message: body.message || '',
      timestamp: new Date().toISOString(),
    };

    // Forward to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheets');
    }

    const result = await response.json();

    return NextResponse.json({
      ok: true,
      message: 'Răspunsul tău a fost înregistrat cu succes',
      data: result
    });

  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { ok: false, error: 'A apărut o eroare. Te rugăm să încerci din nou.' },
      { status: 500 }
    );
  }
}
