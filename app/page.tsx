'use client';

import { useEffect, useState } from 'react';

// Countdown Component
function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        // If date has passed, clamp to 0
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Set initial value
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {/* Days */}
      <div className="flex flex-col items-center">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-1">
          {timeLeft.days}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-gray-700 uppercase tracking-wide">
          Zile
        </div>
      </div>

      {/* Hours */}
      <div className="flex flex-col items-center">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-1">
          {timeLeft.hours}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-gray-700 uppercase tracking-wide">
          Ore
        </div>
      </div>

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-1">
          {timeLeft.minutes}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-gray-700 uppercase tracking-wide">
          Minute
        </div>
      </div>

      {/* Seconds */}
      <div className="flex flex-col items-center">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-1">
          {timeLeft.seconds}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-gray-700 uppercase tracking-wide">
          Secunde
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // RSVP Form State
  const [attending, setAttending] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setSubmitStatus('idle');
    setErrorMessage('');

    // Basic validation
    if (!attending) {
      setSubmitStatus('error');
      setErrorMessage('Te rugăm să selectezi dacă vei participa');
      return;
    }

    if (attending === 'yes' && !name.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Te rugăm să introduci numele tău');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attending,
          name: name.trim(),
          message: message.trim(),
          website: honeypot, // Honeypot field
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setSubmitStatus('success');
        // Reset form
        setAttending('');
        setName('');
        setMessage('');
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'A apărut o eroare. Te rugăm să încerci din nou.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('A apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) return 'Se trimite...';
    if (attending === 'yes') return 'Da, voi participa';
    if (attending === 'no') return 'Nu, nu voi participa';
    return 'Trimite răspunsul';
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#acasa"
            className="text-[15px] md:text-[16px] text-slate-700 hover:text-slate-900 transition-colors font-normal tracking-wide"
          >
            Miruna si Gabriel Petrecere
          </a>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6 md:space-x-10">
            <li>
              <a
                href="#acasa"
                className="text-[14px] md:text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-normal"
              >
                Acasă
              </a>
            </li>
            <li>
              <a
                href="#cand"
                className="text-[14px] md:text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-normal"
              >
                Când?
              </a>
            </li>
            <li>
              <a
                href="#unde"
                className="text-[14px] md:text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-normal"
              >
                Unde?
              </a>
            </li>
            <li>
              <a
                href="#confirmare"
                className="text-[14px] md:text-[15px] text-slate-600 hover:text-slate-900 transition-colors font-normal"
              >
                Confirmare
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section with Circular Badge */}
      <section
        id="acasa"
        className="relative h-[90vh] flex items-center overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/Welcomepagepic.jpeg')" }}
        >
          {/* Very light overlay for subtle contrast */}
          <div className="absolute inset-0 bg-white/5"></div>
        </div>

        {/* Circular Badge - LEFT POSITIONED */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="flex justify-start">
            <div className="relative">
              {/* Outer dashed circle border */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/60"></div>

              {/* Inner dashed circle border */}
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-white/40"></div>

              {/* Main circular badge */}
              <div className="relative bg-[#4A7C91] rounded-full w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] flex flex-col items-center justify-center px-10 py-12 md:px-14 md:py-16 shadow-2xl">

                {/* Top: Date with decorative lines */}
                <div className="flex items-center justify-center w-full mb-6 md:mb-8">
                  <div className="flex-1 h-[1.5px] bg-white mr-3 md:mr-4"></div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-[0.2em] md:tracking-[0.25em] text-white uppercase whitespace-nowrap">
                    Duminică, 31 August 2026
                  </p>
                  <div className="flex-1 h-[1.5px] bg-white ml-3 md:ml-4"></div>
                </div>

                {/* Center: Couple Names */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-2 md:space-y-3">
                  <h1 className="text-white text-center font-serif">
                    {/* First Name */}
                    <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                      Miruna
                    </span>

                    {/* Ampersand */}
                    <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 md:my-3 leading-none">
                      &
                    </span>

                    {/* Second Name */}
                    <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                      Gabriel
                    </span>
                  </h1>
                </div>

                {/* Bottom: Call to action */}
                <div className="mt-6 md:mt-8">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-[0.2em] md:tracking-[0.25em] text-white uppercase">
                    Sărbătorim!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Couple Intro Section */}
      <section id="despre-noi" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[40px] leading-tight font-light tracking-wide text-slate-800 mb-6">
              Miruna Chitic & Gabriel Chitic
            </h2>
            <p className="text-[16px] md:text-[17px] leading-relaxed text-slate-600 max-w-3xl mx-auto">
              Cu emoții și zâmbete, vă invităm cu drag la petrecerea noastră!
            </p>
          </div>

          {/* Two Oval Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
            {/* Miruna */}
            <div className="flex flex-col items-center">
              {/* Oval Image Container */}
              <div className="w-[300px] h-[380px] sm:w-[340px] sm:h-[430px] md:w-[340px] md:h-[430px] lg:w-[380px] lg:h-[480px] rounded-full overflow-hidden shadow-lg mb-6">
                <img
                  src="/images/Miruna.jpg"
                  alt="Miruna"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-[24px] md:text-[28px] font-normal tracking-wide text-slate-800 mb-4">
                Miruna
              </h3>

              {/* Quote */}
              <p className="text-[15px] md:text-[16px] leading-loose text-slate-600 text-center max-w-md italic">
                &ldquo;Dragostea noastră este ca un roman nescris, iar astăzi începem primul capitol împreună.&rdquo;
              </p>
            </div>

            {/* Gabriel */}
            <div className="flex flex-col items-center">
              {/* Oval Image Container */}
              <div className="w-[300px] h-[380px] sm:w-[340px] sm:h-[430px] md:w-[340px] md:h-[430px] lg:w-[380px] lg:h-[480px] rounded-full overflow-hidden shadow-lg mb-6">
                <img
                  src="/images/Gabriel.jpg"
                  alt="Gabriel"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-[24px] md:text-[28px] font-normal tracking-wide text-slate-800 mb-4">
                Gabriel
              </h3>

              {/* Quote */}
              <p className="text-[15px] md:text-[16px] leading-loose text-slate-600 text-center max-w-md italic">
                &ldquo;Azi nu marcăm doar o zi, ci începutul unei călătorii care ne va umple viețile cu iubire și fericire.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Godparents Section */}
      <section id="nasii" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Decorative Container with Seashells */}
          <div className="relative max-w-5xl mx-auto">
            {/* Left Seashell - Hidden on mobile, visible on md+ */}
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 lg:-translate-x-24">
              <img
                src="/images/seashell-left.png"
                alt="Decorative seashell"
                className="w-24 h-24 lg:w-32 lg:h-32 opacity-80"
              />
            </div>

            {/* Right Seashell - Hidden on mobile, visible on md+ */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 lg:translate-x-24">
              <img
                src="/images/seashell-right.png"
                alt="Decorative seashell"
                className="w-24 h-24 lg:w-32 lg:h-32 opacity-80"
              />
            </div>

            {/* Center Card */}
            <div className="relative bg-white rounded-lg shadow-xl border border-gray-100 px-8 py-12 md:px-16 md:py-16 text-center">
              {/* Small Title */}
              <p className="text-[14px] md:text-[15px] leading-relaxed text-slate-600 tracking-widest mb-8 uppercase">
                Nașii, martorii iubirii noastre
              </p>

              {/* Main Names */}
              <h2 className="text-[32px] md:text-[40px] leading-tight font-light tracking-wide text-slate-800">
                Beatrice și Ionuț Maneachin
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Când? - Countdown Banner Section */}
      <section
        id="cand"
        className="relative h-[280px] md:h-[320px] flex items-center overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/Cand-banner.jpg')" }}
        >
          {/* Light overlay for readability */}
          <div className="absolute inset-0 bg-white/40"></div>
        </div>

        {/* Countdown Content - LEFT Aligned */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-6 md:px-10 lg:px-12">
            <div className="max-w-2xl">
              {/* Label and Date */}
              <div className="mb-6 md:mb-8">
                <p className="text-[16px] md:text-[18px] leading-relaxed text-slate-700 font-light mb-3">
                  Au mai rămas până la nuntă:
                </p>
                <p className="text-[28px] md:text-[32px] leading-tight text-slate-800 font-normal tracking-wide">
                  31 August 2026
                </p>
              </div>

              {/* Countdown Timer */}
              <Countdown targetDate="2026-08-31T00:00:00" />
            </div>
          </div>
        </div>
      </section>

      {/* Povestea Noastră - Our Story Section */}
      <section id="povestea" className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">

              {/* Left Column - Image with Floral Overlay */}
              <div className="relative">
                {/* Main Photo */}
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="/images/povestea.jpeg"
                    alt="Povestea noastră"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floral Overlay - Bottom Left - More Outside */}
                <div className="absolute -bottom-12 -left-12 md:-bottom-16 md:-left-16 lg:-bottom-20 lg:-left-20 w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 opacity-90">
                  <img
                    src="/images/Floral.png"
                    alt="Decorative floral"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Right Column - Title and Text */}
              <div className="relative">
                {/* Optional Watermark Background */}
                <div className="absolute top-0 right-0 w-64 h-64 lg:w-80 lg:h-80 opacity-5 pointer-events-none">
                  <img
                    src="/images/leaf-watermark.png"
                    alt=""
                    className="w-full h-full object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>

                {/* Shell Icon - Top Right - Outside */}
                <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 lg:-top-16 lg:-right-16 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 opacity-80">
                  <img
                    src="/images/Shell-icon.png"
                    alt="Shell decoration"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-6">

                  {/* Title */}
                  <h2 className="text-[32px] md:text-[40px] leading-tight font-light tracking-wide text-slate-800 uppercase text-center lg:text-left mb-10">
                    Povestea noastră
                  </h2>

                  {/* Paragraphs */}
                  <div className="space-y-6 text-slate-600 leading-loose">
                    <p className="text-[16px] md:text-[17px]">
                      Sunt momente în viață pe care le aștepți cu sufletul la gură și cu fluturași în stomac, iar acesta, pentru noi, este unul dintre ele.
                    </p>

                    <p className="text-[16px] md:text-[17px]">
                      Începând cu această zi vom păși spre viitor cu planuri ambițioase, cu visuri mărețe și cu forțe proaspete, unite.
                    </p>

                    <p className="text-[16px] md:text-[17px]">
                      Avem deosebita plăcere de a vă invita să fiți alături de noi în ziua în care sufletele noastre se vor uni.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Unde? - Party Details Section with Background */}
      <section
        id="unde"
        className="relative py-16 md:py-20 lg:py-24 min-h-screen flex items-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/party-seaside.jpg')" }}
        >
          {/* Soft overlay for readability */}
          <div className="absolute inset-0 bg-white/75"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 w-full">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[40px] leading-tight font-light tracking-wide text-slate-800 uppercase">
              Detalii cu privire la petrecerea noastră
            </h2>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">

            {/* Card 1 - Petrecerea */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full">
              {/* Media - Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src="/images/party.jpg"
                  alt="Petrecerea"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-[22px] md:text-[24px] font-normal tracking-wide text-slate-800 uppercase mb-6 text-center">
                  Petrecerea
                </h3>

                {/* Details */}
                <div className="space-y-3 text-slate-600 mb-6 flex-1">
                  <p className="text-[17px] md:text-[18px] font-medium text-slate-700">Azur by Ego</p>
                  <p className="text-[15px] md:text-[16px]">900001 Constanța</p>
                  <p className="text-[15px] md:text-[16px]">
                    Duminică, 31 August 2026, Ora 16:00
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href="https://share.google/WZfGghB3MAWQuzv9i"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center uppercase tracking-wide text-sm"
                >
                  Vezi pe hartă
                </a>
              </div>
            </div>

            {/* Card 2 - Band #1 (Lov band) */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full">
              {/* Media - YouTube Embed */}
              <div className="relative aspect-video bg-gray-200">
                <iframe
                  src="https://www.youtube.com/embed/l6mXkH76dxE"
                  title="Lov band"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-[22px] md:text-[24px] font-normal tracking-wide text-slate-800 uppercase mb-6 text-center">
                  Muzică de petrecere
                </h3>

                {/* Details */}
                <div className="space-y-3 text-slate-600 mb-6 flex-1">
                  <p className="text-[17px] md:text-[18px] font-medium text-slate-700">Lov band</p>
                  <p className="text-[15px] md:text-[16px] leading-relaxed">
                    O trupă versatilă cu un repertoriu care aduce împreună toate generațiile.
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href="https://www.youtube.com/watch?v=l6mXkH76dxE"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center uppercase tracking-wide text-sm"
                >
                  Deschide pe YouTube
                </a>
              </div>
            </div>

            {/* Card 3 - Band #2 (Lipovenească) */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full md:col-span-2 lg:col-span-1">
              {/* Media - YouTube Embed */}
              <div className="relative aspect-video bg-gray-200">
                <iframe
                  src="https://www.youtube.com/embed/1wX204fOYcY"
                  title="Lipovenească"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-[22px] md:text-[24px] font-normal tracking-wide text-slate-800 uppercase mb-6 text-center">
                  Muzică tradițională
                </h3>

                {/* Details */}
                <div className="space-y-3 text-slate-600 mb-6 flex-1">
                  <p className="text-[15px] md:text-[16px] leading-relaxed">
                    Muzica lipovenească adusă cu drag de cei mai buni interpreți autohtoni împreună cu cei mai vestit ansamblu din Dobrogea.
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href="https://www.youtube.com/watch?v=1wX204fOYcY"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center uppercase tracking-wide text-sm"
                >
                  Deschide pe YouTube
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Confirmare Section */}
      <section id="confirmare" className="relative min-h-screen flex items-center justify-center bg-gray-50 py-16 md:py-20 lg:py-24">
        {/* Left Decoration - Hidden on mobile */}
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-0">
          <img
            src="/images/Confirm-left.png"
            alt="Decorative seaside"
            className="w-32 h-32 lg:w-40 lg:h-40 opacity-60"
          />
        </div>

        {/* Right Decoration - Hidden on mobile */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-0">
          <img
            src="/images/Confirm-right.png"
            alt="Decorative seaside"
            className="w-32 h-32 lg:w-40 lg:h-40 opacity-60"
          />
        </div>

        {/* Center Card */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="relative max-w-[640px] mx-auto bg-white rounded-lg shadow-xl px-6 py-12 md:px-10 md:py-16 lg:px-12 lg:py-20">

            {/* Leaf Icon */}
            <div className="flex justify-center mb-6">
              <img
                src="/images/leaf-icon.png"
                alt="Leaf decoration"
                className="w-20 h-20 md:w-24 md:h-24"
              />
            </div>

            {/* Title */}
            <h2 className="text-[32px] md:text-[40px] leading-tight font-light tracking-wide text-slate-800 uppercase text-center mb-4">
              Formular de confirmare
            </h2>

            {/* Subtitle */}
            <p className="text-[16px] md:text-[17px] leading-relaxed text-slate-600 text-center mb-8 md:mb-10">
              Te așteptăm cu drag!
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
                <p className="text-[16px] md:text-[17px] text-slate-600 leading-relaxed">
                  Răspunsul tău a fost înregistrat.
                </p>
              </div>
            ) : (
              <>
                {/* RSVP Form */}
                <form onSubmit={handleRSVPSubmit} className="space-y-6">

                  {/* Question 1: Participi? */}
                  <div>
                    <label htmlFor="attending" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                      Participi? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="attending"
                      value={attending}
                      onChange={(e) => setAttending(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px] md:text-[16px] text-slate-700 bg-white"
                      required
                    >
                      <option value="">Selectează o opțiune</option>
                      <option value="yes">Da, voi participa</option>
                      <option value="no">Nu particip</option>
                    </select>
                  </div>

                  {/* Question 2: Numele tău */}
                  <div>
                    <label htmlFor="name" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                      Numele tău {attending === 'yes' && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Numele și prenumele"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px] md:text-[16px] text-slate-700"
                      required={attending === 'yes'}
                    />
                  </div>

                  {/* Question 3: Message / Alergii / Preferințe */}
                  <div>
                    <label htmlFor="message" className="block text-[15px] md:text-[16px] font-medium text-slate-700 mb-2">
                      Mesaj / alergii / preferințe meniu (opțional)
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="ex: alergii, preferințe meniu, un mesaj pentru noi"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px] md:text-[16px] text-slate-700 resize-none"
                    />
                  </div>

                  {/* Honeypot field (hidden from users) */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute opacity-0 pointer-events-none"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-[14px] md:text-[15px] text-red-700">
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !attending}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors text-[15px] md:text-[16px] uppercase tracking-wide"
                  >
                    {getSubmitButtonText()}
                  </button>

                </form>
              </>
            )}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © 2026 Miruna & Gabriel
          </p>
        </div>
      </footer>
    </div>
  );
}
