export default function Landing({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-12">
          <div className="text-5xl font-bold mb-4" style={{ color: '#1565C0' }}>
            [LOGO]
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0D47A1' }}>
            Badanie 360°
          </h1>
          <h2 className="text-2xl font-semibold mb-8" style={{ color: '#333' }}>
            Model Angażującego Przywództwa
          </h2>
          <p className="text-xl mb-2" style={{ color: '#666' }}>
            <strong>SUUS Röhlig Logistics</strong>
          </p>
          <p className="text-lg mb-12" style={{ color: '#999' }}>
            wersja demo
          </p>
        </div>

        {/* Opis */}
        <div className="bg-white rounded-lg p-8 mb-12 shadow-sm">
          <p className="text-lg leading-relaxed" style={{ color: '#555' }}>
            System do oceny kompetencji liderów w 4 obszarach wartości: <strong>Człowiek</strong>, <strong>Rozwój</strong>, <strong>Skuteczność</strong> i <strong>Współpraca</strong>.
          </p>
          <p className="text-lg leading-relaxed mt-4" style={{ color: '#555' }}>
            26 behawioralnych wskaźników, skala oceny 0-4+X.
          </p>
        </div>

        {/* Przyciski */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('survey')}
            className="px-8 py-4 rounded-lg font-semibold text-lg text-white transition-all"
            style={{ backgroundColor: '#2E7D32', hover: { backgroundColor: '#1b5e20' } }}
          >
            Wypełnij ankietę
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="px-8 py-4 rounded-lg font-semibold text-lg text-white transition-all"
            style={{ backgroundColor: '#1565C0', hover: { backgroundColor: '#0d47a1' } }}
          >
            Panel administracyjny
          </button>
        </div>

        {/* Stopka */}
        <p className="text-sm mt-12" style={{ color: '#999' }}>
          BrainStream 360° Demo | SUUS Röhlig Logistics
        </p>
      </div>
    </div>
  )
}
