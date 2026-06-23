import { useState } from 'react'

export default function Report({ data, onBack, onViewFull }) {

  const behaviors = [
    { name: 'Słucha aktywnie', category: 'CZŁOWIEK', yourScore: 4, teamAvg: 3.2 },
    { name: 'Okazuje zainteresowanie rozwojem', category: 'CZŁOWIEK', yourScore: 4, teamAvg: 3.1 },
    { name: 'Szuka nowych wyzwań', category: 'ROZWÓJ', yourScore: 4, teamAvg: 3.4 },
    { name: 'Adaptuje się do zmian', category: 'ROZWÓJ', yourScore: 3, teamAvg: 3.6 },
    { name: 'Definiuje jasne cele', category: 'SKUTECZNOŚĆ', yourScore: 4, teamAvg: 3.2 },
    { name: 'Wykonuje zobowiązania', category: 'SKUTECZNOŚĆ', yourScore: 3, teamAvg: 2.8 },
    { name: 'Współpracuje cross-funkcyjnie', category: 'WSPÓŁPRACA', yourScore: 3, teamAvg: 3.1 },
    { name: 'Rozwiązuje konflikty', category: 'WSPÓŁPRACA', yourScore: 4, teamAvg: 3.5 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 mb-4 font-medium"
          >
            ← Wróć
          </button>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0D47A1' }}>
            Twój raport 360°
          </h1>
          <p className="text-gray-600">
            SUUS Röhlig Logistics — Model Angażującego Przywództwa
          </p>
        </div>

        {/* Profile Overview Chart */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>
            Przegląd profilu
          </h2>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {['CZŁOWIEK (3.8)', 'ROZWÓJ (3.4)', 'SKUTECZNOŚĆ (3.6)', 'WSPÓŁPRACA (3.2)'].map((label, i) => (
              <div key={i} className="p-4 rounded-lg bg-gradient-to-b" style={{ background: `linear-gradient(to bottom, rgba(46,125,50,0.1), rgba(46,125,50,0.05))` }}>
                <p className="text-sm font-medium mb-2" style={{ color: '#333' }}>{label}</p>
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div className="h-3 rounded-full" style={{ width: `${(parseFloat(label.match(/\d\.\d/)[0]) / 4) * 100}%`, backgroundColor: '#2E7D32' }}></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Zielony = Twoja średnia | Średnia zespołu: 3.25
          </p>
        </div>

        {/* Gap Analysis */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>
            Analiza poszczególnych behawiorów
          </h2>
          <div className="space-y-4">
            {behaviors.map((behavior, idx) => (
              <div key={idx} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">{behavior.name}</p>
                  <p className="text-sm text-gray-600">{behavior.category}</p>
                </div>
                <div className="flex gap-8 items-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: '#2E7D32' }}>
                      {behavior.yourScore}
                    </p>
                    <p className="text-xs text-gray-600">Twoja ocena</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: '#1565C0' }}>
                      {behavior.teamAvg}
                    </p>
                    <p className="text-xs text-gray-600">Średnia zespołu</p>
                  </div>
                  <div className="text-right">
                    {behavior.yourScore > behavior.teamAvg ? (
                      <span className="text-sm font-semibold text-green-600">
                        +{(behavior.yourScore - behavior.teamAvg).toFixed(1)}
                      </span>
                    ) : behavior.yourScore < behavior.teamAvg ? (
                      <span className="text-sm font-semibold text-red-600">
                        {(behavior.yourScore - behavior.teamAvg).toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-gray-600">
                        0.0
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="font-bold mb-2" style={{ color: '#2E7D32' }}>Mocne strony</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Słuchanie aktywne</li>
              <li>✓ Definiowanie celów</li>
              <li>✓ Budowanie relacji</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-bold mb-2" style={{ color: '#1565C0' }}>Obszary развития</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>→ Adaptacja do zmian</li>
              <li>→ Wykonywanie zobowiązań</li>
              <li>→ Wspieranie zespołu</li>
            </ul>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h3 className="font-bold mb-2" style={{ color: '#F57F17' }}>Następne kroki</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>1. Rozmowa z przełożonym</li>
              <li>2. Plan rozwoju</li>
              <li>3. Follow-up za 3 miesiące</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-between flex-wrap">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-lg font-medium text-white transition-all"
            style={{ backgroundColor: '#1565C0' }}
          >
            Pobierz PDF
          </button>
          {onViewFull && (
            <button
              onClick={onViewFull}
              className="px-6 py-3 rounded-lg font-medium text-white transition-all"
              style={{ backgroundColor: '#2E7D32' }}
            >
              📄 Pełny raport (40 stron)
            </button>
          )}
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg font-medium bg-gray-200 text-gray-800"
          >
            Wróć na stronę główną
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          BrainStream 360° | SUUS Röhlig Logistics
        </p>
      </div>
    </div>
  )
}
