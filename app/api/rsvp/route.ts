import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwzWwv9qUdWohLV8-8_i9-Gr_uhWlViTCmOt3_4mXeLsHSXquoI0FIYBq-T6IUJBqGS/exec';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check - if filled, silently return success without forwarding
    if (body.website && body.website.trim() !== '') {
      console.log('🚫 Honeypot triggered - bot detected');
      return NextResponse.json({ ok: true, message: 'Răspunsul tău a fost înregistrat cu succes' });
    }

    // Validate required fields
    if (!body.participants) {
      return NextResponse.json(
        { ok: false, error: 'Te rugăm să selectezi numărul de persoane' },
        { status: 400 }
      );
    }

    if (!body.name_primary || body.name_primary.trim() === '') {
      return NextResponse.json(
        { ok: false, error: 'Te rugăm să introduci numele tău' },
        { status: 400 }
      );
    }

    // For participating guests, phone is required
    if (body.status === 'particip' && (!body.phone || body.phone.trim() === '')) {
      return NextResponse.json(
        { ok: false, error: 'Te rugăm să introduci numărul de telefon' },
        { status: 400 }
      );
    }

    // Prepare payload - ensure ALL keys are present
    const payload = {
      participants: body.participants || '',
      status: body.status || '',
      name_primary: body.name_primary || '',
      phone: body.phone || '',
      name_partner: body.name_partner || '',
      kids: body.kids || '0',
      menu_primary: body.menu_primary || '',
      menu_primary_other: body.menu_primary_other || '',
      menu_partner: body.menu_partner || '',
      menu_partner_other: body.menu_partner_other || '',
      message: body.message || '',
      source: 'website',
      timestamp: new Date().toISOString(),
    };

    // Log for debugging
    console.log('📤 Sending to Google Sheets:', JSON.stringify(payload, null, 2));

    // Send as POST with JSON body
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    console.log('📥 Google Sheets response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google Sheets error:', response.status, errorText);
      throw new Error('Failed to submit to Google Sheets');
    }

    const responseText = await response.text();
    console.log('✅ Google Sheets raw response:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { rawResponse: responseText };
    }

    console.log('✅ Parsed response:', result);

    return NextResponse.json({
      ok: true,
      message: 'Răspunsul tău a fost înregistrat cu succes',
      data: result,
    });
  } catch (error) {
    console.error('❌ RSVP submission error:', error);
    return NextResponse.json(
      { ok: false, error: 'A apărut o eroare. Te rugăm să încerci din nou.' },
      { status: 500 }
    );
  }
}
