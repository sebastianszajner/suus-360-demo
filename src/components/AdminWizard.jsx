import { useState } from 'react'
import suusModel from '../data/suus_model.json'

export default function AdminWizard({ onBack }) {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    name: 'Akademia Lidera Biznesowego SUUS',
    startDate: '2024-06-24',
    endDate: '2024-07-24',
    perspectives: ['samoocena', 'przełożony', 'współpracownik', 'podległy'],
    participants: []
  })

  const handleInputChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  const handlePerspectiveToggle = (perspective) => {
    setConfig(prev => ({
      ...prev,
      perspectives: prev.perspectives.includes(perspective)
        ? prev.perspectives.filter(p => p !== perspective)
        : [...prev.perspectives, perspective]
    }))
  }

  const handleAddParticipant = () => {
    const email = prompt('Email uczestnika:')
    if (email) {
      setConfig(prev => ({
        ...prev,
        participants: [...prev.participants, { id: Date.now(), email, status: 'invited' }]
      }))
    }
  }

  const handleRemoveParticipant = (id) => {
    setConfig(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== id)
    }))
  }

  const allPerspectives = [
    { key: 'samoocena', label: 'Samoocena' },
    { key: 'przełożony', label: 'Przełożony' },
    { key: 'współpracownik', label: 'Współpracownik' },
    { key: 'podległy', label: 'Podległy' },
    { key: 'klient-wewnętrzny', label: 'Klient wewnętrzny' },
    { key: 'klient-zewnętrzny', label: 'Klient zewnętrzny' }
  ]

  const progress = (step / 5) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 mb-4 font-medium"
          >
            ← Wróć
          </button>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0D47A1' }}>
            Konfiguracja badania 360°
          </h1>
          <p className="text-gray-600">SUUS Röhlig Logistics — Wizard ({step}/5)</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${progress}%`, backgroundColor: '#2E7D32' }}
            ></div>
          </div>
        </div>

        {/* Dashboard (only on step 1) */}
        {step === 1 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Badania aktywne</p>
              <p className="text-3xl font-bold" style={{ color: '#1565C0' }}>3</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Odpowiedzi</p>
              <p className="text-3xl font-bold" style={{ color: '#2E7D32' }}>127</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Raporty do pobrania</p>
              <p className="text-3xl font-bold" style={{ color: '#0D47A1' }}>12</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
          {/* Krok 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>
                Krok 1: Podstawowe informacje
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Nazwa badania</label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Data startu</label>
                    <input
                      type="date"
                      value={config.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Data końca</label>
                    <input
                      type="date"
                      value={config.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Krok 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>
                Krok 2: Model kompetencyjny
              </h2>
              <p className="text-gray-600 mb-6">Model zawiera 4 wartości i 26 zachowań:</p>
              <div className="space-y-6">
                {suusModel.values.map((value) => (
                  <div key={value.id} className="rounded-lg p-4" style={{ backgroundColor: `${value.color}11` }}>
                    <h3 className="text-lg font-bold mb-2" style={{ color: value.color }}>{value.name}</h3>
                    <p className="text-gray-600 mb-3">{value.description}</p>
                    <div className="text-sm text-gray-500">
                      {value.behaviors.length} zachowań: {value.behaviors.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Krok 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>
                Krok 3: Perspektywy oceny
              </h2>
              <p className="text-gray-600 mb-6">Wybierz kto będzie oceniał:</p>
              <div className="space-y-3">
                {allPerspectives.map((perspective) => (
                  <label key={perspective.key} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      checked={config.perspectives.includes(perspective.key)}
                      onChange={() => handlePerspectiveToggle(perspective.key)}
                      className="w-5 h-5"
                    />
                    <span className="font-medium">{perspective.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Krok 4 */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>
                Krok 4: Uczestnicy
              </h2>
              <button
                onClick={handleAddParticipant}
                className="mb-6 px-4 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: '#1565C0' }}
              >
                + Dodaj uczestnika
              </button>
              {config.participants.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-right py-3 px-4 font-semibold">Akcja</th>
                    </tr>
                  </thead>
                  <tbody>
                    {config.participants.map((p) => (
                      <tr key={p.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{p.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{ backgroundColor: '#E3F2FD', color: '#1565C0' }}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleRemoveParticipant(p.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Usuń
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 italic">Nie dodano jeszcze uczestników</p>
              )}
            </div>
          )}

          {/* Krok 5 */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>
                Krok 5: Podsumowanie
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Nazwa badania</p>
                  <p className="font-semibold">{config.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Data startu</p>
                    <p className="font-semibold">{config.startDate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Data końca</p>
                    <p className="font-semibold">{config.endDate}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Perspektywy oceny</p>
                  <p className="font-semibold">{config.perspectives.join(', ')}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Liczba uczestników</p>
                  <p className="font-semibold">{config.participants.length}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 rounded-lg font-medium bg-gray-200 text-gray-800 disabled:opacity-50"
          >
            ← Wstecz
          </button>
          {step < 5 ? (
            <button
              onClick={() => setStep(Math.min(5, step + 1))}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: '#1565C0' }}
            >
              Dalej →
            </button>
          ) : (
            <button
              onClick={() => alert('Badanie uruchomiono! Zaproszenia wysłano do uczestników.')}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: '#2E7D32' }}
            >
              Uruchom badanie
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
