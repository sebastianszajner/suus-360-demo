export default function Landing({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="w-full py-8 px-4 text-white" style={{ backgroundColor: '#0D47A1' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold">BrainStream 360</span>
            <span className="text-2xl font-light">&gt;&gt;</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Badanie 360°
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Model Angażującego Przywództwa
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Client Badge */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#E3F2FD', color: '#1565C0' }}>
              SUUS Röhlig Logistics
            </div>
          </div>

          {/* About Cards */}
          <div className="space-y-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-3" style={{ color: '#0D47A1' }}>
                O badaniu
              </h2>
              <p className="text-gray-700 leading-relaxed">
                System do oceny kompetencji liderów w 4 obszarach wartości: <strong>Człowiek</strong>, <strong>Rozwój</strong>, <strong>Skuteczność</strong> i <strong>Współpraca</strong>.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-3" style={{ color: '#0D47A1' }}>
                Struktura
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-lg" style={{ color: '#2E7D32' }}>✓</span>
                  <span>26 behawioralnych wskaźników</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-lg" style={{ color: '#2E7D32' }}>✓</span>
                  <span>Skala oceny: 0-4 + X (brak możliwości oceny)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-lg" style={{ color: '#2E7D32' }}>✓</span>
                  <span>4 perspektywy: samoocena, przełożony, peer, podległy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-lg" style={{ color: '#2E7D32' }}>✓</span>
                  <span>2 pytania otwarte na koniec</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-3" style={{ color: '#0D47A1' }}>
                Czas wypełnienia
              </h2>
              <p className="text-gray-700">
                <strong>~20 minut</strong> — 26 zachowań + 2 pytania otwarte
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Ankieta jest całkowicie anonimowa.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 sm:space-y-4 mb-12">
            <button
              onClick={() => onNavigate('survey')}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-lg font-semibold text-white text-base sm:text-lg transition-all shadow-sm hover:shadow-md"
              style={{ backgroundColor: '#2E7D32' }}
            >
              Wypełnij ankietę
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-lg font-semibold text-white text-base sm:text-lg transition-all shadow-sm hover:shadow-md"
              style={{ backgroundColor: '#1565C0' }}
            >
              Panel administracyjny
            </button>
          </div>

          {/* Demo Badge */}
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FFF3E0', color: '#E65100' }}>
              Wersja demo
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-white px-4 py-6 text-center">
        <p className="text-sm text-gray-600">
          BrainStream 360° | SUUS Röhlig Logistics
        </p>
      </div>
    </div>
  )
}
