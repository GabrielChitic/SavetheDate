export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <a
                href="#acasa"
                className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
              >
                Acasă
              </a>
            </li>
            <li>
              <a
                href="#cand"
                className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
              >
                Când?
              </a>
            </li>
            <li>
              <a
                href="#unde"
                className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
              >
                Unde?
              </a>
            </li>
            <li>
              <a
                href="#confirmare"
                className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
              >
                Confirmare
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="acasa"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100"
      >
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-serif text-rose-900 mb-6">
            Save the Date
          </h1>
          <div className="text-3xl md:text-4xl text-gray-700 mb-8 font-light">
            Ana & Mihai
          </div>
          <div className="text-xl md:text-2xl text-gray-600 mb-4">
            15 Septembrie 2026
          </div>
          <div className="text-lg md:text-xl text-gray-500 mb-12">
            București, România
          </div>
          <a
            href="#confirmare"
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Confirmă Prezența
          </a>
        </div>
      </section>

      {/* Când Section */}
      <section id="cand" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center mb-12">
            Când?
          </h2>
          <div className="text-center">
            <div className="inline-block bg-rose-50 rounded-lg p-8 shadow-md">
              <div className="text-6xl font-bold text-rose-600 mb-2">15</div>
              <div className="text-2xl text-gray-700 mb-1">Septembrie</div>
              <div className="text-xl text-gray-600">2026</div>
            </div>
            <p className="mt-8 text-lg text-gray-600">
              Ceremonia va începe la ora 16:00, urmată de petrecere.
            </p>
          </div>
        </div>
      </section>

      {/* Unde Section */}
      <section id="unde" className="py-20 bg-rose-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center mb-12">
            Unde?
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Grădina Eden Events
            </h3>
            <p className="text-gray-600 mb-2">
              Str. Florilor nr. 123, București
            </p>
            <p className="text-gray-600 mb-6">
              Sector 1, România
            </p>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              [Hartă va fi adăugată aici]
            </div>
          </div>
        </div>
      </section>

      {/* Confirmare Section */}
      <section id="confirmare" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center mb-8">
            Confirmare
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Vă rugăm să confirmați prezența până la data de 1 August 2026
          </p>
          <div className="bg-rose-50 rounded-lg shadow-lg p-8 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Formularul de confirmare va fi disponibil în curând.
            </p>
            <div className="text-gray-600">
              Pentru întrebări, ne puteți contacta la:
              <br />
              <a
                href="mailto:contact@example.com"
                className="text-rose-600 hover:text-rose-700 font-medium"
              >
                contact@example.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Cu drag, Ana & Mihai
          </p>
          <p className="text-xs text-gray-500 mt-2">
            © 2026 - Toate drepturile rezervate
          </p>
        </div>
      </footer>
    </div>
  );
}
