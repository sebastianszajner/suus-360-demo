import { useState, useEffect } from 'react'
import { Chart as ChartJS, RadarController, RadarElement, PointElement, LineElement, Filler, Legend, Title, Tooltip } from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadarController, RadarElement, PointElement, LineElement, Filler, Legend, Title, Tooltip)

export default function Report({ data, onBack }) {
  const [radarData, setRadarData] = useState(null)

  useEffect(() => {
    // Mock data — średnie oceny per wartość
    const mockAverages = [3.2, 3.5, 3.0, 3.3]
    const mockYourScores = [3.8, 3.4, 3.6, 3.2]

    setRadarData({
      labels: ['CZŁOWIEK', 'ROZWÓJ', 'SKUTECZNOŚĆ', 'WSPÓŁPRACA'],
      datasets: [
        {
          label: 'Twoja średnia',
          data: mockYourScores,
          borderColor: '#2E7D32',
          backgroundColor: 'rgba(46, 125, 50, 0.1)',
          borderWidth: 2,
        },
        {
          label: 'Średnia zespołu',
          data: mockAverages,
          borderColor: '#1565C0',
          backgroundColor: 'rgba(21, 101, 192, 0.1)',
          borderWidth: 2,
        },
      ],
    })
  }, [])

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 4,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

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

        {/* Radar Chart */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>
            Przegląd profilu
          </h2>
          {radarData && (
            <div style={{ position: 'relative', height: '300px' }}>
              <Radar data={radarData} options={chartOptions} />
            </div>
          )}
          <p className="text-sm text-gray-600 mt-6">
            Zielony = Twoja średnia | Niebieski = Średnia zespołu
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
        <div className="flex gap-4 justify-between">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-lg font-medium text-white transition-all"
            style={{ backgroundColor: '#1565C0' }}
          >
            Pobierz PDF
          </button>
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
