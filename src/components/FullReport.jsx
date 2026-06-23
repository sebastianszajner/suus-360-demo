import { useState } from 'react'
import suusModel from '../data/suus_model.json'
import recommendations from '../data/recommendations.json'

export default function FullReport({ data, onBack }) {
  const getRecommendation = (behaviorId, score) => {
    const rec = recommendations.recommendations[behaviorId]
    if (!rec) return null
    return rec[score] || rec['0']
  }

  // Mock comprehensive data
  const mockResults = {
    selfScore: [3, 4, 2, 3, 3, 4, 3, 3, 3, 2, 3, 4, 2, 3, 4, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 2],
    supervisorScore: [4, 3, 3, 4, 3, 3, 3, 2, 3, 3, 4, 3, 3, 4, 2, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3],
    peerScore: [3, 4, 3, 3, 4, 4, 3, 4, 3, 3, 3, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3, 3, 4, 3, 3],
    subordinateScore: [4, 4, 4, 4, 4, 3, 4, 3, 4, 4, 3, 4, 4, 4, 3, 4, 4, 3, 4, 4, 4, 4, 3, 4, 4, 3]
  }

  const flatBehaviors = suusModel.values.flatMap(v =>
    v.behaviors.map((b, idx) => ({
      id: v.id * 10 + idx + 1,
      name: b,
      value: v.name,
      color: v.color
    }))
  )

  const avgScore = (idx) => {
    const scores = [
      mockResults.selfScore[idx],
      mockResults.supervisorScore[idx],
      mockResults.peerScore[idx],
      mockResults.subordinateScore[idx]
    ]
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 print:p-0">
      <div className="max-w-4xl mx-auto print:max-w-full">
        {/* Header with print button */}
        {typeof window !== 'undefined' && !window.matchMedia('print').matches && (
          <div className="mb-8 flex justify-between items-center">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Wróć
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: '#1565C0' }}
            >
              📄 Pobierz PDF
            </button>
          </div>
        )}

        {/* PAGE 1: EXECUTIVE SUMMARY */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 border-b-2 print:border-b-0 print:page-break-after">
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">STRONA 1</p>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#0D47A1' }}>
              Twój raport 360°
            </h1>
            <p className="text-lg text-gray-600">SUUS Röhlig Logistics — Executive Summary</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-sm text-gray-600 mb-4 font-semibold">Przegląd wyników per wartość</p>
              <div className="space-y-4">
                {suusModel.values.map((value, idx) => {
                  const scores = value.behaviors.map((_, i) =>
                    mockResults.selfScore[idx * 6 + i]
                  )
                  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
                  return (
                    <div key={value.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{value.name}</span>
                        <span className="text-2xl font-bold" style={{ color: value.color }}>
                          {avg}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${(avg / 4) * 100}%`, backgroundColor: value.color }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-4 font-semibold">3 największe mocne strony</p>
              <div className="space-y-3 mb-6">
                {[3, 5, 19].map(idx => (
                  <div key={idx} className="rounded-lg p-4" style={{ backgroundColor: '#2E7D3222' }}>
                    <p className="font-semibold text-sm">{flatBehaviors[idx - 1]?.name}</p>
                    <p className="text-xs text-gray-600 mt-1">Wynik: {mockResults.selfScore[idx - 1]}/4</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 mb-4 font-semibold">3 obszary do pracy</p>
              <div className="space-y-3">
                {[6, 8, 16].map(idx => (
                  <div key={idx} className="rounded-lg p-4" style={{ backgroundColor: '#1565C022' }}>
                    <p className="font-semibold text-sm">{flatBehaviors[idx - 1]?.name}</p>
                    <p className="text-xs text-gray-600 mt-1">Wynik: {mockResults.selfScore[idx - 1]}/4</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-lg font-semibold mb-2">Podsumowanie</p>
            <p className="text-gray-700">
              Twój profil lidera wskazuje na silne fundamenty w obszarze CZŁOWIEK i SKUTECZNOŚĆ,
              z okazją do wzmocnienia kompetencji w ROZWÓJ. Rekomendujemy fokus na adaptację do zmian
              i budowanie odporności na transformacyjne wyzwania organizacji.
            </p>
          </div>
        </div>

        {/* PAGE 2-3: PROFIL NA TLE ORGANIZACJI */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
          <p className="text-sm text-gray-500 mb-4">STRONY 2-3</p>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#333' }}>
            Twój profil na tle organizacji
          </h2>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-4">Porównanie z benchmarkiem</p>
              {suusModel.values.map((value) => (
                <div key={value.id} className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{value.name}</span>
                    <span style={{ color: value.color }} className="font-bold">3.2 / 2.8</span>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded h-1.5 mb-1"></div>
                      <span className="text-gray-600">Ty: 3.2</span>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-300 rounded h-1.5 mb-1"></div>
                      <span className="text-gray-600">Org: 2.8</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm text-gray-600 font-semibold mb-4">Percentyl w organizacji</p>
              <div className="space-y-4">
                {suusModel.values.map((value, idx) => (
                  <div key={value.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold mb-2">{value.name}</p>
                    <p className="text-2xl font-bold" style={{ color: value.color }}>
                      {70 + idx * 5}%
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Jesteś w top {100 - (70 + idx * 5)}% menedżerów
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 4-7: GAP ANALYSIS */}
        {suusModel.values.map((value, valueIdx) => (
          <div key={value.id} style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
            <p className="text-sm text-gray-500 mb-4">STRONA {4 + valueIdx}</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: value.color }}>
              Gap Analysis: {value.name}
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-4">Wyniki dla {value.behaviors.length} zachowań</p>
              <div className="space-y-4">
                {value.behaviors.slice(0, 3).map((behavior, idx) => {
                  const behaviorIdx = valueIdx * 6 + idx
                  const self = mockResults.selfScore[behaviorIdx]
                  const supervisor = mockResults.supervisorScore[behaviorIdx]
                  const peer = mockResults.peerScore[behaviorIdx]
                  const subordinate = mockResults.subordinateScore[behaviorIdx]

                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm">{behavior}</span>
                        <span className="text-lg font-bold" style={{ color: value.color }}>
                          Gap: {Math.abs(self - ((supervisor + peer + subordinate) / 3)).toFixed(1)}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[self, supervisor, peer, subordinate].map((score, i) => (
                          <div
                            key={i}
                            className="flex-1 h-6 rounded"
                            style={{
                              backgroundColor: value.color,
                              opacity: score / 4,
                              title: `${['Ty', 'Przełożony', 'Peer', 'Podległy'][i]}: ${score}`
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Ty: {self} | Przełożony: {supervisor} | Peer: {peer} | Podległy: {subordinate}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <p className="font-semibold mb-2">Interpretacja rozbieżności</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Możliwa niedoświadomość wpływu na innych</li>
                <li>• Różne standardy oceny między perspektywami</li>
                <li>• Obszar do refleksji i rozmowy z zespołem</li>
              </ul>
            </div>
          </div>
        ))}

        {/* PAGE 8-21: SZCZEGÓŁY 26 ZACHOWAŃ */}
        {flatBehaviors.map((behavior, idx) => (
          <div key={behavior.id} style={{ pageBreakAfter: idx % 3 === 2 ? 'always' : 'avoid' }} className="pb-6 mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4" style={{ borderTop: `4px solid ${behavior.color}` }}>
                <p className="text-xs text-gray-500 mb-1">{behavior.value}</p>
                <h3 className="font-bold text-sm mb-3">{behavior.name}</h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Wyniki per perspektywa</p>
                    <div className="flex gap-2">
                      {[mockResults.selfScore[idx], mockResults.supervisorScore[idx],
                        mockResults.peerScore[idx], mockResults.subordinateScore[idx]].map((score, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg font-bold" style={{ color: behavior.color }}>
                            {score}
                          </div>
                          <p className="text-xs text-gray-600">
                            {['Ty', 'Sza', 'Peer', 'Pod'][i]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-1">Średnia zespołu</p>
                    <p className="text-xl font-bold" style={{ color: behavior.color }}>
                      {avgScore(idx)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                {(() => {
                  const rec = getRecommendation(behavior.id, mockResults.selfScore[idx])
                  return (
                    <>
                      <p className="text-xs font-bold text-gray-700 mb-2 uppercase">
                        {rec?.level}
                      </p>
                      <p className="text-xs text-gray-700 mb-3">{rec?.text}</p>
                      <div className="bg-white rounded p-3">
                        <p className="text-xs font-semibold text-gray-700 mb-2">💡 Konkretne działanie:</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{rec?.action}</p>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        ))}

        {/* PAGE 22-25: KOMENTARZE OTWARTE */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
          <p className="text-sm text-gray-500 mb-4">STRONY 22-25</p>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
            Komentarze otwarte
          </h2>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-green-700">Co robisz dobrze?</h3>
              <div className="space-y-4">
                {[
                  'Zawsze słuchasz i rozumiesz naszą perspektywę',
                  'Wspierasz naszą karierę i rozwijasz nas',
                  'Przejrzyste komunikacje — zawsze wiemy gdzie stoimy',
                  'Motywujesz nas do lepszych wyników'
                ].map((comment, i) => (
                  <div key={i} className="rounded-lg p-3" style={{ backgroundColor: '#2E7D3222' }}>
                    <p className="text-sm text-gray-700">"{comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-700">Co mogłbyś robić lepiej?</h3>
              <div className="space-y-4">
                {[
                  'Czasami trudno dostosować się do szybkich zmian',
                  'Mogłbyś bardziej delegować i ufać zespołowi',
                  'Brak czasami czasu na indywidualne coaching',
                  'Mogłbyś bardziej otworzyć się na nowe pomysły'
                ].map((comment, i) => (
                  <div key={i} className="rounded-lg p-3" style={{ backgroundColor: '#1565C022' }}>
                    <p className="text-sm text-gray-700">"{comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Word Cloud — Najczęstsze słowa</h3>
            <div className="flex flex-wrap gap-3 text-center">
              {['przywództwo', 'zespół', 'komunikacja', 'wspieranie', 'inspiracja', 'zaufanie',
                'zmiana', 'nauka', 'rezultaty', 'kultura'].map((word, i) => (
                <span key={i} className="px-3 py-2 bg-white rounded font-semibold"
                  style={{ fontSize: `${12 + i * 0.5}px`, color: suusModel.values[i % 4].color }}>
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* PAGE 26-30: PLAN ROZWOJU */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
          <p className="text-sm text-gray-500 mb-4">STRONY 26-30</p>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
            Plan rozwoju na 90 dni
          </h2>

          <div className="space-y-8">
            {[
              {
                priority: 'Priorytet 1: Adaptacja do zmian',
                goal: 'Stać się bardziej proaktywnym w przyjmowaniu zmian organizacyjnych',
                actions: [
                  'Uczestniczyć w weekly innovation meetings',
                  'Czytać 1 artykuł o transformacji cyfrowej co tydzień',
                  'Przeprowadzić 3 rozmowy z innowatorami z zespołu'
                ],
                timeline: 'Tydzień 1-4: Eksploracja | 5-8: Działanie | 9-12: Konsolidacja'
              },
              {
                priority: 'Priorytet 2: Delegowanie i zaufanie',
                goal: 'Zwiększyć zdolność do delegowania i budowania autonomii zespołu',
                actions: [
                  'Zidentyfikować 3 zadania do delegowania',
                  'Robić weekly check-in zamiast daily monitoring',
                  'Dać zespołowi możliwość podjęcia 2 ważnych decyzji'
                ],
                timeline: 'Tydzień 1-4: Planowanie | 5-8: Delegowanie | 9-12: Refleksja'
              },
              {
                priority: 'Priorytet 3: Coaching indywidualny',
                goal: 'Dedykować więcej czasu 1:1 rozmowom z każdą osobą',
                actions: [
                  'Zaplanować bi-weekly 30-min sesje z każdym',
                  'Przygotować pytania o aspiracje i obszary rozwoju',
                  'Stwórz plan rozwoju dla każdej osoby'
                ],
                timeline: 'Ciągłe przez cały okres'
              }
            ].map((priority, idx) => (
              <div key={idx} className="border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">{priority.priority}</h3>
                <p className="text-gray-700 mb-4"><strong>Cel:</strong> {priority.goal}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Konkretne działania:</p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    {priority.actions.map((action, i) => (
                      <li key={i}>• {action}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  <strong>Harmonogram:</strong> {priority.timeline}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PAGE 31-35: METODOLOGIA */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
          <p className="text-sm text-gray-500 mb-4">STRONY 31-35</p>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
            Kontekst i metodologia
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Jak czytać raport</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Wyniki 0-1:</strong> Obszar krytyczny — natychmiastowa interwencja</li>
                <li>• <strong>Wyniki 2:</strong> Wymaga wzmocnienia — plan działań</li>
                <li>• <strong>Wyniki 3:</strong> Mocna strona — utrzymanie i dzielenie się</li>
                <li>• <strong>Wyniki 4:</strong> Wzorcowe — mentoring dla innych</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Skala oceny (0-4 + X)</h3>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { val: '0', desc: 'Nigdy — zachowanie nie jest widoczne' },
                    { val: '1', desc: 'Rzadko — zdarza się okazjonalnie' },
                    { val: '2', desc: 'Czasami — konsekwentnie w niektórych sytuacjach' },
                    { val: '3', desc: 'Regularnie — konsekwentnie w większości sytuacji' },
                    { val: '4', desc: 'Zawsze — konsekwentnie i naturalne' },
                    { val: 'X', desc: 'Brak możliwości oceny' }
                  ].map(row => (
                    <tr key={row.val} className="border-b">
                      <td className="py-2 px-4 font-semibold w-12">{row.val}</td>
                      <td className="py-2 px-4">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Liczba oceniających</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Samoocena: 1 osoba (Ty)</li>
                <li>• Przełożony: 1 osoba</li>
                <li>• Współpracownicy: 5 osób</li>
                <li>• Podwładni: 4 osób</li>
              </ul>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#1565C022' }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1565C0' }}>Poufność</h3>
              <p className="text-sm text-gray-700">
                Wszystkie odpowiedzi są anonimowe. Nie da się śledzić kto co powiedział.
                Raport zawiera tylko zagregowane wyniki.
              </p>
            </div>
          </div>
        </div>

        {/* PAGE 36-40: APPENDIX */}
        <div style={{ pageBreakAfter: 'avoid' }}>
          <p className="text-sm text-gray-500 mb-4">STRONY 36-40</p>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
            Appendix — Surowe wyniki
          </h2>

          <div className="overflow-x-auto text-xs">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Zachowanie</th>
                  <th className="border border-gray-300 p-2">Ty</th>
                  <th className="border border-gray-300 p-2">Przełożony</th>
                  <th className="border border-gray-300 p-2">Peer</th>
                  <th className="border border-gray-300 p-2">Podległy</th>
                  <th className="border border-gray-300 p-2">Średnia</th>
                </tr>
              </thead>
              <tbody>
                {flatBehaviors.map((behavior, idx) => (
                  <tr key={behavior.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 p-2">{behavior.name}</td>
                    <td className="border border-gray-300 p-2 text-center font-bold">{mockResults.selfScore[idx]}</td>
                    <td className="border border-gray-300 p-2 text-center">{mockResults.supervisorScore[idx]}</td>
                    <td className="border border-gray-300 p-2 text-center">{mockResults.peerScore[idx]}</td>
                    <td className="border border-gray-300 p-2 text-center">{mockResults.subordinateScore[idx]}</td>
                    <td className="border border-gray-300 p-2 text-center font-bold">{avgScore(idx)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t text-center text-xs text-gray-500 print:mt-8">
          <p>Raport 360° — SUUS Röhlig Logistics</p>
          <p>BrainStream 360° | Confidential</p>
        </div>
      </div>

      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .print\\:page-break-after { page-break-after: always; }
          * { page-break-inside: avoid; }
          button { display: none; }
        }
      `}</style>
    </div>
  )
}
