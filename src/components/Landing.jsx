import { BarChart3, ClipboardList, Settings } from 'lucide-react'

export default function Landing({ onNavigate }) {
  return (
    <div className="min-h-screen text-white flex flex-col" style={{
      background: 'linear-gradient(135deg, #0D47A1 0%, #1a237e 100%)'
    }}>
      {/* Main Content */}
      <div className="flex-1 px-4 py-12 sm:py-16 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          {/* Logo Section */}
          <div className="mb-12 sm:mb-16 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl" style={{ backgroundColor: '#1565C0' }}>
                BS
              </div>
              <div>
                <div className="font-bold text-lg sm:text-xl">BrainStream</div>
                <div className="text-white/80 text-xs sm:text-sm">360°</div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 leading-tight">
              Badanie 360°
            </h1>

            {/* Subtitle */}
            <p className="text-center text-white/80 text-sm sm:text-base max-w-lg">
              Model Angażującego Przywództwa · SUUS Röhlig Logistics
            </p>
          </div>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {/* Ankieta Card */}
            <button
              onClick={() => onNavigate('survey')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                  <ClipboardList size={24} style={{ color: '#2E7D32' }} />
                </div>
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Wypełnij ankietę
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                26 wskaźników zachowań w 4 obszarach wartości
              </p>
              <div className="flex items-center text-sm font-semibold" style={{ color: '#2E7D32' }}>
                Zacznij →
              </div>
            </button>

            {/* Raport Card */}
            <button
              onClick={() => {
                // Demo: pokaż przykładowy raport
                onNavigate('report')
              }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E3F2FD' }}>
                  <BarChart3 size={24} style={{ color: '#1565C0' }} />
                </div>
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Zobacz raport demo
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Przegląd raportu 360° z wynikami i rekomendacjami
              </p>
              <div className="flex items-center text-sm font-semibold" style={{ color: '#1565C0' }}>
                Otwórz →
              </div>
            </button>

            {/* Admin Card */}
            <button
              onClick={() => onNavigate('admin')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F3E5F5' }}>
                  <Settings size={24} style={{ color: '#7B1FA2' }} />
                </div>
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Panel administracyjny
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Konfiguracja badania, uczestnicy, wyniki
              </p>
              <div className="flex items-center text-sm font-semibold" style={{ color: '#7B1FA2' }}>
                Otwórz →
              </div>
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-lg">26</div>
                <div className="text-white/70 text-xs">wskaźników</div>
              </div>
              <div>
                <div className="font-bold text-lg">4</div>
                <div className="text-white/70 text-xs">wartości</div>
              </div>
              <div>
                <div className="font-bold text-lg">4</div>
                <div className="text-white/70 text-xs">perspektywy</div>
              </div>
              <div>
                <div className="font-bold text-lg">~20</div>
                <div className="text-white/70 text-xs">minut</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/20 px-4 py-6 text-center">
        <p className="text-sm text-white/60">
          BrainStream 360° Demo | SUUS Röhlig Logistics
        </p>
        <p className="text-xs text-white/40 mt-2">
          Badanie anonimowe · wersja demonstracyjna
        </p>
      </div>
    </div>
  )
}
