import { useState } from 'react'
import suusModel from '../data/suus_model.json'
import recommendations from '../data/recommendations.json'

export default function FullReport({ data, onBack }) {
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
      valueId: v.id,
      color: v.color
    }))
  )

  const avgScore = (idx) => {
    const scores = [mockResults.selfScore[idx], mockResults.supervisorScore[idx], mockResults.peerScore[idx], mockResults.subordinateScore[idx]]
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
  }

  const getTop3Recommendations = (valueId) => {
    const valueBehaviors = flatBehaviors.filter(b => b.valueId === valueId)
    return valueBehaviors
      .map((b, idx) => ({
        ...b,
        avgScore: parseFloat(avgScore(idx + (valueId - 1) * 6))
      }))
      .sort((a, b) => a.avgScore - b.avgScore)
      .slice(0, 3)
  }

  const valueAvgs = suusModel.values.map(value => {
    const startIdx = (value.id - 1) * 6
    const endIdx = startIdx + value.behaviors.length
    const scores = mockResults.selfScore.slice(startIdx, endIdx)
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
  })

  const getBlindSpots = () => {
    return flatBehaviors.map((b, idx) => {
      const self = mockResults.selfScore[idx]
      const others = [mockResults.supervisorScore[idx], mockResults.peerScore[idx], mockResults.subordinateScore[idx]]
      const othersAvg = others.reduce((a, b) => a + b, 0) / others.length
      return { behavior: b.name, self, othersAvg, gap: (self - othersAvg).toFixed(1) }
    })
  }

  const blindSpots = getBlindSpots()
  const positiveBlind = blindSpots.filter(b => parseFloat(b.gap) > 0.5).slice(0, 3)
  const overrated = blindSpots.filter(b => parseFloat(b.gap) < -0.5).slice(0, 3)

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-white py-8 px-4 print:p-0">
      <div className="max-w-5xl mx-auto print:max-w-full">
        {/* Header */}
        {typeof window !== 'undefined' && !window.matchMedia('print').matches && (
          <div className="mb-8 flex justify-between items-center">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 font-medium">
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

        {/* PAGE 1: BRIEFING WYKONAWCZY */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">STRONA 1</p>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#0D47A1' }}>
              Twój raport 360°
            </h1>
            <p className="text-lg text-gray-600">SUUS Röhlig Logistics — Briefing Wykonawczy</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {suusModel.values.map((value, idx) => (
              <div key={value.id} className="rounded-lg p-6" style={{ backgroundColor: `${value.color}11` }}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold" style={{ color: value.color }}>{value.name}</h3>
                  <div className="text-right">
                    <p className="text-3xl font-bold" style={{ color: value.color }}>
                      {valueAvgs[idx]}
                    </p>
                    <p className="text-xs text-gray-600">/4.0</p>
                  </div>
                </div>

                <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
                  <div
                    className="h-3 rounded-full"
                    style={{ width: `${(valueAvgs[idx] / 4) * 100}%`, backgroundColor: value.color }}
                  ></div>
                </div>

                <p className="text-xs text-gray-600 mb-3">{value.description}</p>

                <div className="text-xs space-y-1">
                  <p><span className="font-semibold text-green-700">✓ 3 mocne strony</span></p>
                  <p><span className="font-semibold text-blue-700">→ 3 do pracy</span></p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="font-semibold mb-2">Podsumowanie profilu</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Twój profil wskazuje na solidne fundamenty w CZŁOWIEK (3.8) i SKUTECZNOŚCI (3.6).
              Największa okazja do wzrostu to ROZWÓJ (3.4) — szczególnie w adaptacji do zmian i budowaniu
              odporności na transformację. Twój zespół widzi Ciebie jako wiarygodnego lidera z potencjałem
              na wyższą responsywność w szybko zmieniającym się środowisku.
            </p>
          </div>
        </div>

        {/* PAGE 2: PAJĘCZYNA + HEATMAP */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
          <p className="text-sm text-gray-500 mb-4">STRONA 2</p>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
            Twój profil w perspektywie
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-semibold mb-4">Pajęczyna kompetencji</p>
              <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center text-gray-400 text-sm">
                [Radar chart: Ty vs Przełożony vs Peer vs Podległy]
              </div>
            </div>

            <div>
              <p className="font-semibold mb-4">Heatmap: Perspektywy</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Kompetencja</th>
                    <th className="p-2">Ty</th>
                    <th className="p-2">Pzeł.</th>
                    <th className="p-2">Peer</th>
                    <th className="p-2">Pod.</th>
                  </tr>
                </thead>
                <tbody>
                  {suusModel.values.map((value, idx) => (
                    <tr key={value.id} className="border-b">
                      <td className="p-2 font-semibold text-left">{value.name}</td>
                      {[mockResults.selfScore, mockResults.supervisorScore, mockResults.peerScore, mockResults.subordinateScore].map((scores, scoreIdx) => {
                        const startIdx = idx * 6
                        const avg = (scores.slice(startIdx, startIdx + 6).reduce((a, b) => a + b) / 6).toFixed(1)
                        const intensity = parseInt(avg) / 4
                        return (
                          <td
                            key={scoreIdx}
                            className="p-2 text-center font-bold text-white"
                            style={{ backgroundColor: `rgba(21, 101, 192, ${intensity})` }}
                          >
                            {avg}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PAGE 3: LUKI PERCEPCJI + TOP 5 */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
          <p className="text-sm text-gray-500 mb-4">STRONA 3</p>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
            Luki percepcji & Top 5
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-semibold text-sm mb-3">Luki percepcji (Ty vs Zespół)</p>
              <div className="space-y-2 text-xs">
                {suusModel.values.slice(0, 4).map((value, idx) => {
                  const selfAvg = parseFloat(valueAvgs[idx])
                  const teamAvg = (
                    (mockResults.supervisorScore.slice(idx * 6, idx * 6 + 6).reduce((a, b) => a + b) / 6 +
                    mockResults.peerScore.slice(idx * 6, idx * 6 + 6).reduce((a, b) => a + b) / 6 +
                    mockResults.subordinateScore.slice(idx * 6, idx * 6 + 6).reduce((a, b) => a + b) / 6) / 3
                  ).toFixed(1)
                  const gap = (selfAvg - teamAvg).toFixed(1)
                  const arrow = gap > 0 ? '↑ pomarańczowa' : '↓ zielona'
                  return (
                    <div key={value.id} className="flex justify-between items-center">
                      <span>{value.name}</span>
                      <div className="text-right">
                        <span className="font-bold">{gap}</span>
                        <span className="text-xs text-gray-500 ml-1">{arrow}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <p className="font-semibold text-sm mb-3">Top 5 mocne strony</p>
                <div className="space-y-2">
                  {flatBehaviors.sort((a, b) => mockResults.selfScore[flatBehaviors.indexOf(b)] - mockResults.selfScore[flatBehaviors.indexOf(a)]).slice(0, 5).map((behavior, idx) => (
                    <div key={behavior.id} className="flex items-center gap-3">
                      <div className="w-16 bg-green-200 rounded h-6 flex items-center justify-center text-xs font-bold text-green-800">
                        {mockResults.selfScore[flatBehaviors.indexOf(behavior)]}/4
                      </div>
                      <span className="text-xs">{behavior.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-sm mb-3">Top 5 do pracy</p>
                <div className="space-y-2">
                  {flatBehaviors.sort((a, b) => mockResults.selfScore[flatBehaviors.indexOf(a)] - mockResults.selfScore[flatBehaviors.indexOf(b)]).slice(0, 5).map((behavior, idx) => (
                    <div key={behavior.id} className="flex items-center gap-3">
                      <div className="w-16 bg-blue-200 rounded h-6 flex items-center justify-center text-xs font-bold text-blue-800">
                        {mockResults.selfScore[flatBehaviors.indexOf(behavior)]}/4
                      </div>
                      <span className="text-xs">{behavior.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 4: BLIND SPOTS */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
          <p className="text-sm text-gray-500 mb-4">STRONA 4</p>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
            Ślepe plamki & Przeszacowania
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-bold mb-4 text-green-900">Pozytywne ślepe plamki</h3>
              <p className="text-xs text-gray-600 mb-4">Widzisz siebie wyżej niż zespół — może być wyżej</p>
              <div className="space-y-3">
                {positiveBlind.map((spot, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold">{spot.behavior}</span>
                      <span className="text-xs text-green-700 font-bold">+{spot.gap}</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded h-1.5">
                      <div className="h-1.5 bg-green-500 rounded" style={{ width: `${Math.abs(parseFloat(spot.gap)) * 25}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="font-bold mb-4 text-red-900">Obszary przeszacowane</h3>
              <p className="text-xs text-gray-600 mb-4">Zespół widzi wyżej — warto wysłuchać feedbacku</p>
              <div className="space-y-3">
                {overrated.map((spot, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold">{spot.behavior}</span>
                      <span className="text-xs text-red-700 font-bold">{spot.gap}</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded h-1.5">
                      <div className="h-1.5 bg-red-500 rounded" style={{ width: `${Math.abs(parseFloat(spot.gap)) * 25}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PAGES 5-8: ANALIZA GLOBALNA PER WARTOŚĆ */}
        {suusModel.values.map((value, valueIdx) => (
          <div key={value.id} style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
            <p className="text-sm text-gray-500 mb-4">STRONA {5 + valueIdx}</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: value.color }}>
              {value.name}
            </h2>
            <p className="text-gray-600 mb-6">{value.description}</p>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="font-semibold mb-3">Analiza</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                W obszarze {value.name.toLowerCase()} wykazujesz średni wynik {valueAvgs[valueIdx]}/4.0,
                co wskazuje na solidne kompetencje z możliwością dalszego wzmocnienia. Zespół postrzega
                Ciebie jako osobę godną zaufania w tym zakresie, chociaż widzą przestrzeń do jeszcze większej
                konsekwencji i inicjatywy. Rekomendujemy fokus na trzy obszary poniżej.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Rozwijając tę kompetencję, przyspieszy to Twój awans i wzmocni zespół wokół Ciebie.
              </p>
            </div>

            <div className="mt-6">
              <p className="font-semibold mb-4">3 rekomendacje do działania</p>
              <div className="space-y-4">
                {getTop3Recommendations(value.id).map((behavior, idx) => {
                  const rec = recommendations.recommendations[behavior.id]?.[mockResults.selfScore[flatBehaviors.indexOf(behavior)]]
                  return (
                    <div key={behavior.id} className="rounded-lg p-4" style={{ backgroundColor: `${value.color}22` }}>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-sm">{behavior.name}</h3>
                        <span className="text-sm font-bold" style={{ color: value.color }}>
                          {mockResults.selfScore[flatBehaviors.indexOf(behavior)]}/4
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">{rec?.text}</p>
                      <p className="text-xs text-gray-600 font-semibold">💡 {rec?.action}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}

        {/* PAGES 9-12: MOCNE STRONY W OBRAZIE */}
        {Array.from({ length: 4 }).map((_, pageIdx) => (
          <div key={pageIdx} style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
            <p className="text-sm text-gray-500 mb-4">STRONA {9 + pageIdx}</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
              Mocne strony w obrazie globalnym
            </h2>

            {flatBehaviors.filter((_, idx) => mockResults.selfScore[idx] === 4).slice(pageIdx * 4, (pageIdx + 1) * 4).map((behavior, idx) => (
              <div key={behavior.id} className="rounded-lg p-6 mb-6" style={{ backgroundColor: `${behavior.color}11` }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: behavior.color }}>
                  {behavior.name}
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  To jest Twoja supermoc. Ludzie widzą to w Tobie konsekwentnie.
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-gray-600 mb-2">Kontekst biznesowy</p>
                    <p className="text-gray-700">
                      Ta kompetencja bezpośrednio wpływa na wyniki zespołu i Twoją efektywność jako lidera.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600 mb-2">Przykład zastosowania</p>
                    <p className="text-gray-700">
                      Przykład z ostatniego miesiąca: jak to przywództwo zaprowadziło konkretny wynik?
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* PAGES 13-16: GŁOSY ZESPOŁU */}
        {Array.from({ length: 4 }).map((_, pageIdx) => (
          <div key={pageIdx} style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
            <p className="text-sm text-gray-500 mb-4">STRONA {13 + pageIdx}</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
              Co mówią Twoi ludzie
            </h2>

            <div className="space-y-4">
              {[
                { sentiment: 'positive', icon: '✓', title: 'Co robisz dobrze', comments: [
                  'Zawsze słuchasz naszych perspektyw',
                  'Wspierasz naszą karierę i wzrost',
                  'Przejrzyste komunikacje — wiemy gdzie stoimy'
                ]},
                { sentiment: 'constructive', icon: '→', title: 'Obszary do pracy', comments: [
                  'Czasami trudno dostosować się szybko do zmian',
                  'Mogłbyś bardziej delegować i ufać',
                  'Brak czasami czasu na indywidualne rozmowy'
                ]}
              ].map((section, idx) => (
                <div key={idx}>
                  <p className="font-semibold mb-3 text-lg">{section.title}</p>
                  <div className="space-y-2">
                    {section.comments.map((comment, cIdx) => (
                      <div
                        key={cIdx}
                        className="rounded-lg p-4"
                        style={{ backgroundColor: section.sentiment === 'positive' ? '#E8F5E922' : '#E3F2FD22' }}
                      >
                        <p className="text-sm text-gray-700">"{comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* PAGES 17-19: METODOLOGIA */}
        <div style={{ pageBreakAfter: 'always' }} className="pb-8 mb-8 print:page-break-after">
          <p className="text-sm text-gray-500 mb-4">STRONY 17-19</p>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#333' }}>
            Kontekst i metodologia
          </h2>

          <div className="space-y-6 text-sm">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold mb-3">Jak czytać raport</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>0-1:</strong> Obszar krytyczny — natychmiastowa interwencja potrzebna</li>
                <li>• <strong>2:</strong> Wymaga wzmocnienia — plan działań i wsparcie</li>
                <li>• <strong>3:</strong> Mocna strona — utrzymanie i dzielenie się umiejętnościami</li>
                <li>• <strong>4:</strong> Wzorcowe — mentoring dla innych, lider zmian</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold mb-3">Skala oceny (0-4 + X)</h3>
              <table className="w-full text-xs">
                <tbody>
                  {[
                    { val: '0', desc: 'Nigdy — zachowanie nie jest widoczne' },
                    { val: '1', desc: 'Rzadko — zdarza się okazjonalnie' },
                    { val: '2', desc: 'Czasami — konsekwentnie w niektórych sytuacjach' },
                    { val: '3', desc: 'Regularnie — konsekwentnie w większości sytuacji' },
                    { val: '4', desc: 'Zawsze — konsekwentnie i naturalnie' },
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
              <h3 className="font-bold mb-3">Liczba oceniających</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Samoocena: 1 osoba (Ty)</li>
                <li>• Przełożony: 1 osoba</li>
                <li>• Współpracownicy: 5 osób</li>
                <li>• Podwładni: 4 osób</li>
              </ul>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#1565C022' }}>
              <h3 className="font-bold mb-2" style={{ color: '#1565C0' }}>Poufność</h3>
              <p className="text-gray-700">
                Wszystkie odpowiedzi są anonimowe. Nie da się śledzić kto co powiedział.
                Raport zawiera tylko zagregowane wyniki.
              </p>
            </div>
          </div>
        </div>

        {/* PAGES 20-21: APPENDIX */}
        <div style={{ pageBreakAfter: 'avoid' }}>
          <p className="text-sm text-gray-500 mb-4">STRONY 20-21</p>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#333' }}>
            Appendix — Dane surowe
          </h2>

          <div className="overflow-x-auto text-xs">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Zachowanie</th>
                  <th className="border border-gray-300 p-2">Ty</th>
                  <th className="border border-gray-300 p-2">Przeł.</th>
                  <th className="border border-gray-300 p-2">Peer</th>
                  <th className="border border-gray-300 p-2">Pod.</th>
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
