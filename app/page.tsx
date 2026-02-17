'use client';

import { useState } from 'react';

export default function Home() {
  // RSVP Form State
  const [participants, setParticipants] = useState('');
  const [namePrimary, setNamePrimary] = useState('');
  const [phone, setPhone] = useState('');
  const [namePartner, setNamePartner] = useState('');
  const [kids, setKids] = useState('');
  const [menuPrimary, setMenuPrimary] = useState('');
  const [menuPrimaryOther, setMenuPrimaryOther] = useState('');
  const [menuPartner, setMenuPartner] = useState('');
  const [menuPartnerOther, setMenuPartnerOther] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () => {
    setParticipants('');
    setNamePrimary('');
    setPhone('');
    setNamePartner('');
    setKids('');
    setMenuPrimary('');
    setMenuPrimaryOther('');
    setMenuPartner('');
    setMenuPartnerOther('');
    setMessage('');
    setHoneypot('');
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitStatus('idle');

    // Validation
    if (!participants) {
      setErrorMessage('Te rugăm să selectezi numărul de persoane');
      setSubmitStatus('error');
      return;
    }

    if (!namePrimary.trim()) {
      setErrorMessage('Te rugăm să introduci numele tău');
      setSubmitStatus('error');
      return;
    }

    // Determine status
    const status = participants === '0' ? 'nu_particip' : 'particip';

    // Additional validation for participating guests
    if (status === 'particip') {
      if (!phone.trim()) {
        setErrorMessage('Te rugăm să introduci numărul de telefon');
        setSubmitStatus('error');
        return;
      }

      if (!kids) {
        setErrorMessage('Te rugăm să selectezi opțiunea pentru copii');
        setSubmitStatus('error');
        return;
      }

      if (!menuPrimary) {
        setErrorMessage('Te rugăm să alegi tipul de meniu');
        setSubmitStatus('error');
        return;
      }

      if (menuPrimary === 'other' && !menuPrimaryOther.trim()) {
        setErrorMessage('Te rugăm să specifici meniul tău');
        setSubmitStatus('error');
        return;
      }

      if (participants === '2') {
        if (!namePartner.trim()) {
          setErrorMessage('Te rugăm să introduci numele partenerului');
          setSubmitStatus('error');
          return;
        }

        if (!menuPartner) {
          setErrorMessage('Te rugăm să alegi tipul de meniu pentru partener');
          setSubmitStatus('error');
          return;
        }

        if (menuPartner === 'other' && !menuPartnerOther.trim()) {
          setErrorMessage('Te rugăm să specifici meniul partenerului');
          setSubmitStatus('error');
          return;
        }
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        participants,
        status,
        name_primary: namePrimary.trim(),
        phone: phone.trim(),
        name_partner: namePartner.trim(),
        kids: kids || '0',
        menu_primary: menuPrimary,
        menu_primary_other: menuPrimaryOther.trim(),
        menu_partner: menuPartner,
        menu_partner_other: menuPartnerOther.trim(),
        message: message.trim(),
        website: honeypot, // Honeypot field
        source: 'website',
      };

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.ok) {
        setSubmitStatus('success');
        // Don't reset immediately - let user see success message
      } else {
        setErrorMessage(data.error || 'A apărut o eroare. Te rugăm să încerci din nou.');
        setSubmitStatus('error');
      }
    } catch (error) {
      setErrorMessage('A apărut o eroare. Te rugăm să încerci din nou.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) return 'Se trimite...';
    if (participants === '0') return 'Nu, nu voi participa';
    return 'Da, voi participa';
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Fixed Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2ED]/95 backdrop-blur-sm border-b border-gray-200">
        <nav className="container mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Left side - intentionally empty */}
          <div></div>

          {/* Right side - Navigation Links */}
          <ul className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
            <li>
              <a
                href="#acasa"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-slate-700 hover:text-slate-900 transition-colors"
              >
                Acasă
              </a>
            </li>
            <li>
              <a
                href="#photo"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-slate-700 hover:text-slate-900 transition-colors"
              >
                Foto
              </a>
            </li>
            <li className="hidden sm:block">
              <a
                href="#povestea"
                className="text-[13px] md:text-[14px] lg:text-[15px] text-slate-700 hover:text-slate-900 transition-colors"
              >
                Povestea Noastră
              </a>
            </li>
            <li>
              <a
                href="#details"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-slate-700 hover:text-slate-900 transition-colors"
              >
                Detalii
              </a>
            </li>
            <li>
              <a
                href="#rsvp"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                RSVP
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-slate-700 hover:text-slate-900 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section - #acasa */}
      <section
        id="acasa"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20"
      >
        {/* Top Left - Date (Hidden on very small screens) */}
        <div className="hidden sm:block absolute top-20 sm:top-24 left-4 sm:left-6 md:left-12">
          <p className="text-[13px] sm:text-[15px] md:text-[17px] text-slate-600">
            30 August 2026
          </p>
        </div>

        {/* Top Right - Location (Hidden on very small screens) */}
        <div className="hidden sm:block absolute top-20 sm:top-24 right-4 sm:right-6 md:right-12 text-right">
          <p className="text-[13px] sm:text-[15px] md:text-[17px] text-slate-600 max-w-[180px] sm:max-w-none">
            Azur By Ego Restaurant, Constanța
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Simple Blue Palm Tree + Sun + Waves (matching reference style) */}
          <div className="mb-6 sm:mb-10 flex justify-center">
            <svg
              width="360"
              height="180"
              viewBox="0 0 360 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-85 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
            >
              {/* Palm Tree - Simple Blue Style */}
              {/* Large Palm Fronds */}
              <path
                d="M180 110 Q150 65, 120 40"
                stroke="#7B9FAE"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M180 110 Q160 60, 140 30"
                stroke="#7B9FAE"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M180 110 Q170 55, 160 20"
                stroke="#7B9FAE"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M180 110 Q175 50, 170 15"
                stroke="#7B9FAE"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M180 110 Q185 50, 190 15"
                stroke="#7B9FAE"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M180 110 Q190 55, 200 20"
                stroke="#7B9FAE"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M180 110 Q200 60, 220 30"
                stroke="#7B9FAE"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M180 110 Q210 65, 240 40"
                stroke="#7B9FAE"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Palm Trunk */}
              <path
                d="M180 110 Q178 130, 180 150"
                stroke="#7B9FAE"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />

              {/* Sun - Simple Circle */}
              <circle
                cx="260"
                cy="55"
                r="20"
                stroke="#7B9FAE"
                strokeWidth="3"
                fill="none"
              />

              {/* Wavy Lines (island/water) */}
              <path
                d="M60 150 Q100 142, 140 150 T220 150 T300 150"
                stroke="#7B9FAE"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Main Title - Script Style using CSS */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-slate-900 mb-4 sm:mb-6 leading-none px-2"
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontWeight: '700',
                letterSpacing: '-0.02em'
              }}>
            Miruna & Gabriel
          </h1>

          {/* Invitation Text */}
          <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4 px-2">
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 tracking-wide leading-relaxed">
              Vă invităm să sărbătorim împreună pe
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800 tracking-wide">
              30 August 2026
            </p>
          </div>

          {/* Buttons - Mobile-Friendly Touch Targets */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 px-4">
            {/* Primary Button */}
            <a
              href="#rsvp"
              className="w-full sm:w-auto inline-block px-6 sm:px-8 py-4 min-h-[48px] bg-[#5B7C8D] text-white text-[14px] sm:text-[15px] md:text-[16px] font-semibold uppercase tracking-wider rounded hover:bg-[#4A6A7A] transition-colors text-center"
            >
              Confirmă Prezența
            </a>

            {/* Secondary Button */}
            <a
              href="#details"
              className="w-full sm:w-auto inline-block px-6 sm:px-8 py-4 min-h-[48px] border-2 border-[#5B7C8D] text-[#5B7C8D] text-[14px] sm:text-[15px] md:text-[16px] font-semibold uppercase tracking-wider rounded hover:bg-[#5B7C8D] hover:text-white transition-colors text-center"
            >
              Detalii
            </a>
          </div>

          {/* RSVP Deadline Text */}
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-slate-600 italic px-4">
            Confirmă prezența până pe 1 August 2026
          </p>
        </div>
      </section>

      {/* Photo Section - #photo - Full Width Hero Photo */}
      <section
        id="photo"
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-[#F5F2ED]"
      >
        {/* Background Photo - Contains full image without cropping */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-photo.jpeg')" }}
        >
          {/* Very subtle overlay for depth (optional) */}
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

        {/* Bottom Left - Loose Doodle Wave */}
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 pointer-events-none opacity-70">
          <svg
            width="180"
            height="120"
            viewBox="0 0 180 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Loose wavy line */}
            <path
              d="M10 60 Q30 45, 50 55 T90 60 Q110 65, 130 55 T170 60"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Second parallel wave */}
            <path
              d="M15 75 Q35 62, 55 70 T95 75 Q115 78, 135 70 T170 75"
              stroke="#1F2937"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Small decorative curve */}
            <path
              d="M20 95 Q40 88, 60 95"
              stroke="#1F2937"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Bottom Right - Loose Doodle Wave (mirrored) */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 pointer-events-none opacity-70">
          <svg
            width="180"
            height="120"
            viewBox="0 0 180 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Loose wavy line (mirrored) */}
            <path
              d="M170 60 Q150 45, 130 55 T90 60 Q70 65, 50 55 T10 60"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Second parallel wave */}
            <path
              d="M165 75 Q145 62, 125 70 T85 75 Q65 78, 45 70 T10 75"
              stroke="#1F2937"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Small decorative curve */}
            <path
              d="M160 95 Q140 88, 120 95"
              stroke="#1F2937"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      </section>

      {/* Our Story Section - #povestea */}
      <section
        id="povestea"
        className="relative w-full py-12 sm:py-16 md:py-20 lg:py-28 xl:py-36 bg-[#EBF5F9] overflow-hidden"
      >
        {/* Main Content Container */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24">
          {/* Two Column Grid - Stack on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center">

            {/* LEFT Column - Title + Story Text */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {/* Title - Professional script style */}
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-tight"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: '400',
                  letterSpacing: '-0.02em'
                }}
              >
                Povestea noastră
              </h2>

              {/* Story Text - Professional dark blue for readability */}
              <div className="max-w-2xl text-[#2C4F5E] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[1.7] sm:leading-[1.8]">
                <p className="mb-5">
                  Dintr-a șasea clasă ne-am văzut — și ne-a rămas în minte,<br />
                  ca un „poate" de atunci, păstrat cumva cuminte.
                </p>

                <p className="mb-5">
                  Pe 7 ianuarie, la un cocktail, ne-am prins dintr-odată;<br />
                  trei-patru baruri, mult râs — și „noi doi" a fost treaba clară.
                </p>

                <p className="mb-5">
                  Kemer: prima vacanță — soare, all-inclusive și vibe bun între noi,<br />
                  unde ne-am apropiat firesc, fără grabă, doar în doi.
                </p>

                <p className="mb-5">
                  Etna: schi pe vulcan — puțin curaj, puțin „wow", multă bucurie,<br />
                  și ne-am dat seama încă o dată cât de bine ne e împreună.
                </p>

                <p className="mb-5">
                  Tenerife: vin și fructe de mare — și marea ne-a luat de mână,<br />
                  Madeira ne-a ținut pe val… iar în Paxos, pe scuter, pe-o plajă bună,
                </p>

                <p>
                  am zis un „DA" simplu și mare — fără discurs, fără decor;<br />
                  și mergem mai departe împreună, cu mult râs… și dor de ocean: pe scurt, cu amor.
                </p>
              </div>
            </div>

            {/* RIGHT Column - Illustration/Photo */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <img
                  src="/images/our-story-illustration.png"
                  alt="Miruna și Gabriel - Povestea noastră"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Decorative Wave Doodles - Bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-30">
          <svg
            width="400"
            height="80"
            viewBox="0 0 400 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gentle wave line */}
            <path
              d="M10 40 Q60 25, 110 40 T210 40 Q260 25, 310 40 T390 40"
              stroke="#7B9FAE"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Second wave below */}
            <path
              d="M30 55 Q80 42, 130 55 T230 55 Q280 42, 330 55 T390 55"
              stroke="#7B9FAE"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Small decorative dots */}
            <circle cx="120" cy="30" r="2" fill="#7B9FAE" opacity="0.5" />
            <circle cx="280" cy="32" r="2" fill="#7B9FAE" opacity="0.5" />
            <circle cx="200" cy="28" r="1.5" fill="#7B9FAE" opacity="0.4" />
          </svg>
        </div>
      </section>

      {/* Details Section - #details - Three Pillars Style */}
      <section
        id="details"
        className="relative w-full py-12 sm:py-16 md:py-20 lg:py-28 xl:py-36 bg-[#F7F3EA]"
      >
        {/* Title Section - Consistent with "Povestea noastră" */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 px-4">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-tight"
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontWeight: '400',
              letterSpacing: '-0.02em'
            }}
          >
            Detalii
          </h2>
        </div>

        {/* Three Pillars Container */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 md:gap-14 lg:gap-16 max-w-7xl mx-auto">

            {/* Pillar 1 - Petrecerea */}
            <div className="flex flex-col items-center text-center h-full">
              {/* Icon - Party/Celebration (Champagne Glasses) */}
              <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
                <svg
                  width="130"
                  height="130"
                  viewBox="0 0 130 130"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Left champagne glass */}
                  <path d="M42 35 L38 55 Q40 62, 45 62 L45 80" stroke="#5B7C8D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M40 80 L50 80" stroke="#5B7C8D" strokeWidth="3" strokeLinecap="round" />
                  <path d="M38 35 L52 35" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Right champagne glass */}
                  <path d="M88 35 L92 55 Q90 62, 85 62 L85 80" stroke="#5B7C8D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M80 80 L90 80" stroke="#5B7C8D" strokeWidth="3" strokeLinecap="round" />
                  <path d="M78 35 L92 35" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Bubbles/sparkles */}
                  <circle cx="48" cy="45" r="2" fill="#5B7C8D" />
                  <circle cx="52" cy="40" r="1.5" fill="#5B7C8D" />
                  <circle cx="82" cy="45" r="2" fill="#5B7C8D" />
                  <circle cx="78" cy="40" r="1.5" fill="#5B7C8D" />

                  {/* Celebration sparkle */}
                  <path d="M65 25 L65 30" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M60 28 L70 28" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M62 26 L68 31" stroke="#5B7C8D" strokeWidth="2" strokeLinecap="round" />
                  <path d="M68 26 L62 31" stroke="#5B7C8D" strokeWidth="2" strokeLinecap="round" />

                  {/* Decorative waves at bottom */}
                  <path d="M30 95 Q40 90, 50 95 T70 95 T90 95 T100 95" stroke="#7B9FAE" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl uppercase tracking-wider text-[#5B7C8D] font-semibold mt-6 mb-6">
                Petrecerea
              </h3>

              {/* Description - Grows to fill space */}
              <div className="text-[15px] md:text-[16px] text-[#6B8A9C] leading-relaxed space-y-2 max-w-sm flex-grow mb-6">
                <p>
                  <strong>Azur by Ego</strong><br />
                  900001 Constanța
                </p>
                <p>
                  Duminică, 30 August 2026<br />
                  Ora 16:00
                </p>
              </div>

              {/* CTA - Pushed to bottom with touch-friendly sizing */}
              <a
                href="https://share.google/WZfGghB3MAWQuzv9i"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 min-h-[44px] bg-[#5B7C8D] text-white text-sm uppercase tracking-wider rounded hover:bg-[#4A6A7A] transition-colors mt-auto"
              >
                Vezi pe hartă
              </a>
            </div>

            {/* Pillar 2 - Muzică de petrecere */}
            <div className="flex flex-col items-center text-center h-full">
              {/* Icon - Party Music (Music Notes with Waves) */}
              <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
                <svg
                  width="130"
                  height="130"
                  viewBox="0 0 130 130"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Large music note 1 */}
                  <ellipse cx="48" cy="75" rx="8" ry="6" fill="#5B7C8D" />
                  <path d="M56 75 L56 35" stroke="#5B7C8D" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M56 35 Q62 32, 70 35" stroke="#5B7C8D" strokeWidth="3" strokeLinecap="round" fill="none" />

                  {/* Large music note 2 */}
                  <ellipse cx="70" cy="72" rx="8" ry="6" fill="#5B7C8D" />
                  <path d="M78 72 L78 32" stroke="#5B7C8D" strokeWidth="3.5" strokeLinecap="round" />

                  {/* Connecting beam */}
                  <path d="M56 45 L78 42" stroke="#5B7C8D" strokeWidth="4" strokeLinecap="round" />
                  <path d="M56 52 L78 49" stroke="#5B7C8D" strokeWidth="3.5" strokeLinecap="round" />

                  {/* Sound waves - left */}
                  <path d="M25 50 Q28 45, 31 50" stroke="#7B9FAE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M20 55 Q24 48, 28 55" stroke="#7B9FAE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M15 60 Q20 51, 25 60" stroke="#7B9FAE" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                  {/* Sound waves - right */}
                  <path d="M99 50 Q102 45, 105 50" stroke="#7B9FAE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M102 55 Q106 48, 110 55" stroke="#7B9FAE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M105 60 Q110 51, 115 60" stroke="#7B9FAE" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                  {/* Small decorative note */}
                  <circle cx="92" cy="68" r="3" fill="#7B9FAE" opacity="0.6" />
                  <path d="M95 68 L95 58" stroke="#7B9FAE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl uppercase tracking-wider text-[#5B7C8D] font-semibold mt-6 mb-6">
                Muzică de Petrecere
              </h3>

              {/* Description - Grows to fill space */}
              <div className="text-[15px] md:text-[16px] text-[#6B8A9C] leading-relaxed max-w-sm flex-grow mb-6">
                <p>
                  Lov band – O trupă versatilă cu un repertoriu care aduce împreună toate generațiile.
                </p>
              </div>

              {/* CTA - Pushed to bottom with touch-friendly sizing */}
              <a
                href="https://www.youtube.com/watch?v=l6mXkH76dxE"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 min-h-[44px] bg-[#5B7C8D] text-white text-sm uppercase tracking-wider rounded hover:bg-[#4A6A7A] transition-colors mt-auto"
              >
                Ascultă pe YouTube
              </a>
            </div>

            {/* Pillar 3 - Muzică tradițională */}
            <div className="flex flex-col items-center text-center h-full">
              {/* Icon - Traditional Music (Accordion/Folk Instrument) */}
              <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
                <svg
                  width="130"
                  height="130"
                  viewBox="0 0 130 130"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Accordion body - left side */}
                  <rect x="35" y="45" width="22" height="40" rx="2" stroke="#5B7C8D" strokeWidth="3" fill="none" />

                  {/* Accordion body - right side */}
                  <rect x="73" y="45" width="22" height="40" rx="2" stroke="#5B7C8D" strokeWidth="3" fill="none" />

                  {/* Bellows (middle folded part) */}
                  <path d="M57 48 L73 48" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M57 55 L73 55" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M57 62 L73 62" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M57 69 L73 69" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M57 76 L73 76" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M57 82 L73 82" stroke="#5B7C8D" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Keys/buttons on left side */}
                  <circle cx="46" cy="55" r="2.5" fill="#5B7C8D" />
                  <circle cx="46" cy="63" r="2.5" fill="#5B7C8D" />
                  <circle cx="46" cy="71" r="2.5" fill="#5B7C8D" />

                  {/* Keys on right side */}
                  <circle cx="84" cy="55" r="2.5" fill="#5B7C8D" />
                  <circle cx="84" cy="63" r="2.5" fill="#5B7C8D" />
                  <circle cx="84" cy="71" r="2.5" fill="#5B7C8D" />

                  {/* Decorative folk pattern circles */}
                  <circle cx="46" cy="50" r="1.5" stroke="#7B9FAE" strokeWidth="1.5" fill="none" />
                  <circle cx="84" cy="50" r="1.5" stroke="#7B9FAE" strokeWidth="1.5" fill="none" />

                  {/* Musical notes floating around */}
                  <circle cx="25" cy="60" r="3" fill="#7B9FAE" opacity="0.6" />
                  <path d="M28 60 L28 48" stroke="#7B9FAE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

                  <circle cx="105" cy="65" r="3" fill="#7B9FAE" opacity="0.6" />
                  <path d="M108 65 L108 53" stroke="#7B9FAE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

                  {/* Decorative wave at bottom */}
                  <path d="M35 95 Q50 90, 65 95 T95 95" stroke="#7B9FAE" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl uppercase tracking-wider text-[#5B7C8D] font-semibold mt-6 mb-6">
                Muzică Tradițională
              </h3>

              {/* Description - Grows to fill space */}
              <div className="text-[15px] md:text-[16px] text-[#6B8A9C] leading-relaxed max-w-sm flex-grow mb-6">
                <p>
                  Muzică lipovenească adusă cu drag de cei mai buni interpreți autohtoni împreună cu cel mai vestit ansamblu din Dobrogea.
                </p>
              </div>

              {/* CTA - Pushed to bottom with touch-friendly sizing */}
              <a
                href="https://www.youtube.com/watch?v=YyfZPeIZ1vI"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 min-h-[44px] bg-[#5B7C8D] text-white text-sm uppercase tracking-wider rounded hover:bg-[#4A6A7A] transition-colors mt-auto"
              >
                Ascultă pe YouTube
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* RSVP Section - #rsvp */}
      <section
        id="rsvp"
        className="relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-36 bg-[#EBF5F9]"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">

          {/* Two Column Layout - Icon + Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start max-w-7xl mx-auto">

            {/* Left Column - Wedding Cake Icon */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start order-2 lg:order-1">
              <svg
                width="280"
                height="340"
                viewBox="0 0 280 340"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[240px] md:max-w-[280px]"
              >
                {/* Cake Stand Base */}
                <ellipse cx="140" cy="320" rx="60" ry="8" fill="#5B7C8D" opacity="0.2" />

                {/* Cake Stand Stem */}
                <rect x="130" y="300" width="20" height="20" rx="2" fill="none" stroke="#5B7C8D" strokeWidth="2.5" />

                {/* Cake Stand Top */}
                <ellipse cx="140" cy="300" rx="50" ry="8" fill="none" stroke="#5B7C8D" strokeWidth="2.5" />

                {/* Bottom Tier */}
                <ellipse cx="140" cy="240" rx="80" ry="15" fill="none" stroke="#5B7C8D" strokeWidth="3" />
                <path d="M60 240 L60 280" stroke="#5B7C8D" strokeWidth="3" />
                <path d="M220 240 L220 280" stroke="#5B7C8D" strokeWidth="3" />
                <ellipse cx="140" cy="280" rx="80" ry="15" fill="none" stroke="#5B7C8D" strokeWidth="3" />

                {/* Bottom Tier Decorations */}
                <path d="M80 255 Q90 245, 100 255 T120 255 T140 255 T160 255 T180 255 T200 255"
                      stroke="#5B7C8D" strokeWidth="2" fill="none" />
                <circle cx="80" cy="268" r="3" fill="#5B7C8D" />
                <circle cx="110" cy="268" r="3" fill="#5B7C8D" />
                <circle cx="140" cy="268" r="3" fill="#5B7C8D" />
                <circle cx="170" cy="268" r="3" fill="#5B7C8D" />
                <circle cx="200" cy="268" r="3" fill="#5B7C8D" />

                {/* Middle Tier */}
                <ellipse cx="140" cy="180" rx="65" ry="12" fill="none" stroke="#5B7C8D" strokeWidth="3" />
                <path d="M75 180 L75 215" stroke="#5B7C8D" strokeWidth="3" />
                <path d="M205 180 L205 215" stroke="#5B7C8D" strokeWidth="3" />
                <ellipse cx="140" cy="215" rx="65" ry="12" fill="none" stroke="#5B7C8D" strokeWidth="3" />

                {/* Middle Tier Decorations */}
                <path d="M95 195 Q105 188, 115 195 T135 195 T155 195 T175 195 T185 195"
                      stroke="#5B7C8D" strokeWidth="2" fill="none" />
                <circle cx="95" cy="205" r="2.5" fill="#5B7C8D" />
                <circle cx="120" cy="205" r="2.5" fill="#5B7C8D" />
                <circle cx="140" cy="205" r="2.5" fill="#5B7C8D" />
                <circle cx="160" cy="205" r="2.5" fill="#5B7C8D" />
                <circle cx="185" cy="205" r="2.5" fill="#5B7C8D" />

                {/* Top Tier */}
                <ellipse cx="140" cy="130" rx="50" ry="10" fill="none" stroke="#5B7C8D" strokeWidth="3" />
                <path d="M90 130 L90 160" stroke="#5B7C8D" strokeWidth="3" />
                <path d="M190 130 L190 160" stroke="#5B7C8D" strokeWidth="3" />
                <ellipse cx="140" cy="160" rx="50" ry="10" fill="none" stroke="#5B7C8D" strokeWidth="3" />

                {/* Top Tier Decorations */}
                <path d="M108 143 Q118 138, 128 143 T148 143 T168 143 T172 143"
                      stroke="#5B7C8D" strokeWidth="2" fill="none" />
                <circle cx="108" cy="151" r="2" fill="#5B7C8D" />
                <circle cx="130" cy="151" r="2" fill="#5B7C8D" />
                <circle cx="150" cy="151" r="2" fill="#5B7C8D" />
                <circle cx="172" cy="151" r="2" fill="#5B7C8D" />

                {/* Bride & Groom Topper */}
                {/* Groom */}
                <circle cx="125" cy="100" r="8" fill="none" stroke="#5B7C8D" strokeWidth="2.5" />
                <path d="M125 108 L125 95" stroke="#5B7C8D" strokeWidth="2.5" />
                <path d="M118 102 L132 102" stroke="#5B7C8D" strokeWidth="2.5" />
                <path d="M125 95 L125 85" stroke="#5B7C8D" strokeWidth="2" />
                <path d="M125 85 L120 75" stroke="#5B7C8D" strokeWidth="2" />
                <path d="M125 85 L130 75" stroke="#5B7C8D" strokeWidth="2" />

                {/* Bride */}
                <circle cx="155" cy="100" r="8" fill="none" stroke="#5B7C8D" strokeWidth="2.5" />
                <path d="M155 108 L155 85" stroke="#5B7C8D" strokeWidth="2.5" />
                <path d="M148 102 L162 102" stroke="#5B7C8D" strokeWidth="2.5" />
                {/* Dress */}
                <path d="M155 85 Q145 75, 145 70 L165 70 Q165 75, 155 85"
                      fill="none" stroke="#5B7C8D" strokeWidth="2" />

                {/* Hearts */}
                <path d="M135 65 Q135 62, 137 62 Q139 62, 139 64 Q139 62, 141 62 Q143 62, 143 65 Q143 68, 139 71 Q135 68, 135 65"
                      fill="#5B7C8D" opacity="0.6" />
              </svg>
            </div>

            {/* Right Column - Form Content */}
            <div className="lg:col-span-8 bg-white rounded-lg shadow-lg px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 order-1 lg:order-2">

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-slate-900 mb-3 sm:mb-4"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: '400',
                    letterSpacing: '-0.02em'
                  }}>
                Confirmă prezența
              </h2>

              {/* Subtitle */}
              <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-[#5B7C8D] mb-6 sm:mb-8 leading-relaxed">
                Te așteptăm cu drag! Completează formularul de mai jos pentru a ne confirma prezența.
              </p>

            {/* Success Message */}
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[24px] md:text-[28px] font-normal text-slate-800 mb-3">
                  Mulțumim!
                </h3>
                <p className="text-[16px] md:text-[17px] text-slate-600 leading-relaxed mb-6">
                  Răspunsul tău a fost înregistrat cu succes.
                </p>
                <button
                  onClick={resetForm}
                  className="text-[#5B7C8D] hover:text-[#4A6A7A] underline text-sm"
                >
                  Trimite un alt răspuns
                </button>
              </div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-6">

                {/* Step 1: Persoane participante - Always visible */}
                <div>
                  <label htmlFor="participants" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                    Persoane participante <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="participants"
                    value={participants}
                    onChange={(e) => {
                      setParticipants(e.target.value);
                      // Reset conditional fields when changing selection
                      setNamePartner('');
                      setKids('');
                      setMenuPrimary('');
                      setMenuPrimaryOther('');
                      setMenuPartner('');
                      setMenuPartnerOther('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700 bg-white"
                    required
                  >
                    <option value="">Selectează</option>
                    <option value="1">1 persoană</option>
                    <option value="2">2 persoane</option>
                    <option value="0">Nu particip</option>
                  </select>
                </div>

                {/* Conditional fields based on participants selection */}
                {participants && (
                  <>
                    {/* Numele tău - Always required */}
                    <div>
                      <label htmlFor="namePrimary" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                        Numele tău <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="namePrimary"
                        value={namePrimary}
                        onChange={(e) => setNamePrimary(e.target.value)}
                        placeholder="Numele și prenumele"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700"
                        required
                      />
                    </div>

                    {/* Case A & B: Participating (1 or 2 persons) */}
                    {participants !== '0' && (
                      <>
                        {/* Numărul de telefon */}
                        <div>
                          <label htmlFor="phone" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                            Numărul de telefon <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+40 XXX XXX XXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700"
                            required
                          />
                        </div>

                        {/* Case B only: Partner name */}
                        {participants === '2' && (
                          <div>
                            <label htmlFor="namePartner" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                              Numele partenerului <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="namePartner"
                              value={namePartner}
                              onChange={(e) => setNamePartner(e.target.value)}
                              placeholder="Numele și prenumele partenerului"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700"
                              required
                            />
                          </div>
                        )}

                        {/* Veniți cu copii? */}
                        <div>
                          <label htmlFor="kids" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                            Veniți cu copii? <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="kids"
                            value={kids}
                            onChange={(e) => setKids(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700 bg-white"
                            required
                          >
                            <option value="">Selectează</option>
                            <option value="0">Fără copii</option>
                            <option value="1">1 copil</option>
                            <option value="2">2 copii</option>
                            <option value="3">3 copii</option>
                          </select>
                        </div>

                        {/* Meniu pentru tine */}
                        <div>
                          <label htmlFor="menuPrimary" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                            Alege tipul de meniu pentru tine <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="menuPrimary"
                            value={menuPrimary}
                            onChange={(e) => {
                              setMenuPrimary(e.target.value);
                              if (e.target.value !== 'other') {
                                setMenuPrimaryOther('');
                              }
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700 bg-white"
                            required
                          >
                            <option value="">Selectează</option>
                            <option value="normal">Normal</option>
                            <option value="vegan">Vegan</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="pescetarian">Pescetarian</option>
                            <option value="other">Altă opțiune</option>
                          </select>
                        </div>

                        {/* Meniu specific - tu */}
                        {menuPrimary === 'other' && (
                          <div>
                            <label htmlFor="menuPrimaryOther" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                              Te rugăm să specifici meniul <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="menuPrimaryOther"
                              value={menuPrimaryOther}
                              onChange={(e) => setMenuPrimaryOther(e.target.value)}
                              placeholder="Specifică preferințele tale"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700"
                              required
                            />
                          </div>
                        )}

                        {/* Case B only: Partner menu */}
                        {participants === '2' && (
                          <>
                            <div>
                              <label htmlFor="menuPartner" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                                Alege tipul de meniu pentru partenerul tău <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="menuPartner"
                                value={menuPartner}
                                onChange={(e) => {
                                  setMenuPartner(e.target.value);
                                  if (e.target.value !== 'other') {
                                    setMenuPartnerOther('');
                                  }
                                }}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700 bg-white"
                                required
                              >
                                <option value="">Selectează</option>
                                <option value="normal">Normal</option>
                                <option value="vegan">Vegan</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="pescetarian">Pescetarian</option>
                                <option value="other">Altă opțiune</option>
                              </select>
                            </div>

                            {/* Meniu specific - partener */}
                            {menuPartner === 'other' && (
                              <div>
                                <label htmlFor="menuPartnerOther" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                                  Te rugăm să specifici meniul (partener) <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="menuPartnerOther"
                                  value={menuPartnerOther}
                                  onChange={(e) => setMenuPartnerOther(e.target.value)}
                                  placeholder="Specifică preferințele partenerului"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700"
                                  required
                                />
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {/* Case C: Not participating - optional partner name */}
                    {participants === '0' && (
                      <div>
                        <label htmlFor="namePartner" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                          Numele partenerului (opțional)
                        </label>
                        <input
                          type="text"
                          id="namePartner"
                          value={namePartner}
                          onChange={(e) => setNamePartner(e.target.value)}
                          placeholder="Numele și prenumele partenerului"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700"
                        />
                      </div>
                    )}

                    {/* Mesaj - optional for all cases */}
                    <div>
                      <label htmlFor="message" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                        Vrei să ne transmiți ceva? (opțional)
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Mesajul tău pentru noi..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7C8D] focus:border-transparent text-[15px] md:text-[16px] text-slate-700 resize-none"
                      />
                    </div>

                    {/* Honeypot field - hidden from users, for anti-spam */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-[14px] md:text-[15px] text-red-700">
                          {errorMessage}
                        </p>
                      </div>
                    )}

                    {/* Submit Button - Touch-Friendly */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[48px] bg-[#5B7C8D] hover:bg-[#4A6A7A] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-wide"
                    >
                      {getSubmitButtonText()}
                    </button>
                  </>
                )}
              </form>
            )}

            </div>
            {/* End Right Column */}

          </div>
          {/* End Grid */}

        </div>
        {/* End Container */}
      </section>

      {/* Contact Section - #contact - Mobile-First Responsive */}
      <section
        id="contact"
        className="relative py-16 md:py-24 lg:py-36 bg-[#FBF7EF] overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start max-w-7xl mx-auto">

            {/* Left Column - Title + Contact Blocks (Mobile-First) */}
            <div className="lg:col-span-7 space-y-8 md:space-y-10">

              {/* Headline - Responsive Typography */}
              <div className="space-y-3 text-center lg:text-left">
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-tight"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: '400',
                    letterSpacing: '-0.01em'
                  }}
                >
                  Întrebări? Scrie-ne cu drag!
                </h2>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#6B8A9C] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Cel mai simplu: WhatsApp sau un telefon rapid.
                </p>
              </div>

              {/* Contact Blocks Container - Mobile-Optimized */}
              <div className="space-y-10 md:space-y-14">

                {/* Contact Block 1 - Miruna */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Name */}
                  <div>
                    <h3 className="text-[20px] md:text-[22px] font-semibold text-[#5B7C8D] mb-1">
                      Miruna Chitic
                    </h3>
                  </div>

                  {/* Right: Contact Details */}
                  <div className="space-y-3">
                    {/* Phone */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-[14px] sm:text-[15px] text-[#6B8A9C]">Telefon:</span>
                      <a
                        href="tel:+40741237102"
                        className="text-[14px] sm:text-[15px] md:text-[16px] text-[#5B7C8D] hover:text-[#4A6A7A] transition-colors"
                      >
                        0741 237 102
                      </a>
                      <a
                        href="https://wa.me/40741237102"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-3 py-2 min-h-[36px] bg-[#25D366] text-white text-xs rounded hover:bg-[#20BA59] transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                      <span className="text-[14px] sm:text-[15px] text-[#6B8A9C]">Email:</span>
                      <a
                        href="mailto:Miruna_ciotic@yahoo.com"
                        className="text-[14px] sm:text-[15px] md:text-[16px] text-[#5B7C8D] hover:text-[#4A6A7A] transition-colors break-all"
                      >
                        Miruna_ciotic@yahoo.com
                      </a>
                    </div>

                    {/* Helper text */}
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#8B9FAE] italic pt-2">
                      Ideal: WhatsApp sau telefon.
                    </p>
                  </div>
                </div>

                {/* Contact Block 2 - Gabriel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Name */}
                  <div>
                    <h3 className="text-[20px] md:text-[22px] font-semibold text-[#5B7C8D] mb-1">
                      Gabriel Chitic
                    </h3>
                  </div>

                  {/* Right: Contact Details */}
                  <div className="space-y-3">
                    {/* Phone */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-[14px] sm:text-[15px] text-[#6B8A9C]">Telefon:</span>
                      <a
                        href="tel:+40720030145"
                        className="text-[14px] sm:text-[15px] md:text-[16px] text-[#5B7C8D] hover:text-[#4A6A7A] transition-colors"
                      >
                        0720 030 145
                      </a>
                      <a
                        href="https://wa.me/40720030145"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-3 py-2 min-h-[36px] bg-[#25D366] text-white text-xs rounded hover:bg-[#20BA59] transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                      <span className="text-[14px] sm:text-[15px] text-[#6B8A9C]">Email:</span>
                      <a
                        href="mailto:Chiticgabriel@gmail.com"
                        className="text-[14px] sm:text-[15px] md:text-[16px] text-[#5B7C8D] hover:text-[#4A6A7A] transition-colors break-all"
                      >
                        Chiticgabriel@gmail.com
                      </a>
                    </div>

                    {/* Helper text */}
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#8B9FAE] italic pt-2">
                      Ideal: WhatsApp sau telefon.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column - Seaside Doodle Illustration (Hidden on small mobile) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end hidden md:flex">
              <svg
                width="320"
                height="360"
                viewBox="0 0 320 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[240px] lg:max-w-[280px] xl:max-w-[320px]"
              >
                {/* Starfish - Top */}
                <path
                  d="M160 40 L170 70 L200 75 L175 95 L180 125 L160 110 L140 125 L145 95 L120 75 L150 70 Z"
                  stroke="#7B9FAE"
                  strokeWidth="3"
                  fill="none"
                  strokeLinejoin="round"
                />
                <circle cx="160" cy="85" r="3" fill="#7B9FAE" />

                {/* Starfish - Middle Left */}
                <path
                  d="M80 140 L88 165 L113 168 L93 185 L97 210 L80 197 L63 210 L67 185 L47 168 L72 165 Z"
                  stroke="#7B9FAE"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinejoin="round"
                />
                <circle cx="80" cy="180" r="2.5" fill="#7B9FAE" />

                {/* Shell - Scallop */}
                <path
                  d="M250 100 Q230 110, 230 130 L270 130 Q270 110, 250 100 Z"
                  stroke="#7B9FAE"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path d="M240 105 L240 130" stroke="#7B9FAE" strokeWidth="1.5" />
                <path d="M250 100 L250 130" stroke="#7B9FAE" strokeWidth="1.5" />
                <path d="M260 105 L260 130" stroke="#7B9FAE" strokeWidth="1.5" />

                {/* Conch Shell - Right */}
                <path
                  d="M270 170 Q280 165, 290 170 Q295 180, 290 190 Q280 195, 270 190 Q265 180, 270 170"
                  stroke="#7B9FAE"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M275 175 Q280 172, 285 175 Q287 180, 285 185 Q280 188, 275 185 Q273 180, 275 175"
                  stroke="#7B9FAE"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Small Starfish - Bottom Right */}
                <path
                  d="M240 240 L245 255 L260 257 L248 268 L250 283 L240 274 L230 283 L232 268 L220 257 L235 255 Z"
                  stroke="#7B9FAE"
                  strokeWidth="2"
                  fill="none"
                  strokeLinejoin="round"
                />

                {/* Envelope with Heart */}
                <rect
                  x="100"
                  y="240"
                  width="120"
                  height="85"
                  rx="4"
                  stroke="#7B9FAE"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Envelope flap */}
                <path
                  d="M100 240 L160 280 L220 240"
                  stroke="#7B9FAE"
                  strokeWidth="3"
                  fill="none"
                  strokeLinejoin="round"
                />
                <path
                  d="M100 325 L160 285 L220 325"
                  stroke="#7B9FAE"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                {/* Heart on envelope */}
                <path
                  d="M150 270 Q150 265, 153 265 Q156 265, 156 268 Q156 265, 159 265 Q162 265, 162 270 Q162 275, 156 280 Q150 275, 150 270 Z"
                  fill="#7B9FAE"
                  opacity="0.7"
                />

                {/* Decorative dots */}
                <circle cx="60" cy="100" r="2" fill="#7B9FAE" opacity="0.5" />
                <circle cx="280" cy="220" r="2" fill="#7B9FAE" opacity="0.5" />
                <circle cx="120" cy="200" r="2" fill="#7B9FAE" opacity="0.5" />
                <circle cx="200" cy="160" r="2" fill="#7B9FAE" opacity="0.5" />
              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">© 2026 Miruna & Gabriel</p>
        </div>
      </footer>
    </div>
  );
}
