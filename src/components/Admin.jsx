import { useState } from 'react'
import suusModel from '../data/suus_model.json'

export default function Admin({ onBack }) {
  const [activeTab, setActiveTab] = useState('config')

  const tabs = [
    { id: 'config', label: 'Konfiguracja badania' },
    { id: 'model', label: 'Model kompetencyjny' },
    { id: 'perspectives', label: 'Perspektywy oceny' },
    { id: 'participants', label: 'Uczestnicy' },
    { id: 'reports', label: 'Raporty' },
    { id: 'integration', label: 'Integracja' },
  ]

  const mockParticipants = [
    { id: 1, name: 'Anna Kowalska', email: 'a.kowalska@suus.pl', status: 'Zaproszony', progress: '0%' },
    { id: 2, name: 'Piotr Nowak', email: 'p.nowak@suus.pl', status: 'W trakcie', progress: '60%' },
    { id: 3, name: 'Marta Lewandowska', email: 'm.lewandowska@suus.pl', status: 'Zakończony', progress: '100%' },
    { id: 4, name: 'Krzysztof Dabrowski', email: 'k.dabrowski@suus.pl', status: 'Zaproszony', progress: '0%' },
    { id: 5, name: 'Elżbieta Szymańska', email: 'e.szymanska@suus.pl', status: 'W trakcie', progress: '30%' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 mb-4 font-medium"
          >
            ← Wróć
          </button>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0D47A1' }}>
            Panel administracyjny
          </h1>
          <p className="text-gray-600">
            SUUS Röhlig Logistics — Zarządzanie badaniem 360°
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={activeTab === tab.id ? { backgroundColor: '#1565C0' } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          {/* Konfiguracja */}
          {activeTab === 'config' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>Konfiguracja badania</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Nazwa badania</label>
                  <input
                    type="text"
                    defaultValue="Akademia Lidera Biznesowego SUUS"
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Data startu</label>
                    <input type="date" defaultValue="2024-06-24" className="w-full border rounded-lg p-3" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Data końca</label>
                    <input type="date" defaultValue="2024-07-24" className="w-full border rounded-lg p-3" />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2">Grupy uczestników</label>
                  <input
                    type="text"
                    defaultValue="Menedżerowie (15), Dyrektorzy (5), Liderzy zespołów (20)"
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Model */}
          {activeTab === 'model' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>Model kompetencyjny</h2>
              <div className="space-y-8">
                {suusModel.values.map((value, idx) => (
                  <div key={idx} className="border-l-4 pl-6" style={{ borderColor: value.color }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: value.color }}
                      ></div>
                      <h3 className="text-lg font-bold">{value.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{value.description}</p>
                    <div className="text-sm text-gray-500">
                      {value.behaviors.length} zachowań
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-gray-600"><strong>Razem:</strong> 26 behawioralnych wskaźników</p>
              </div>
            </div>
          )}

          {/* Perspektywy */}
          {activeTab === 'perspectives' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>Perspektywy oceny</h2>
              <div className="space-y-3">
                {[
                  { name: 'Samoocena', checked: true },
                  { name: 'Przełożony', checked: true },
                  { name: 'Współpracownik', checked: true },
                  { name: 'Podległy', checked: true },
                  { name: 'Klient wewnętrzny', checked: false },
                  { name: 'Klient zewnętrzny', checked: false },
                ].map((perspective, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      defaultChecked={perspective.checked}
                      className="w-5 h-5"
                    />
                    <span>{perspective.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Uczestnicy */}
          {activeTab === 'participants' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>Uczestnicy badania</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: '#ddd' }}>
                    <th className="text-left py-3 px-4 font-semibold">Imię i nazwisko</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Postęp</th>
                  </tr>
                </thead>
                <tbody>
                  {mockParticipants.map(p => (
                    <tr key={p.id} className="border-b hover:bg-gray-50" style={{ borderColor: '#eee' }}>
                      <td className="py-3 px-4">{p.name}</td>
                      <td className="py-3 px-4 text-gray-600">{p.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className="px-2 py-1 rounded text-xs font-semibold"
                          style={{
                            backgroundColor: p.status === 'Zakończony' ? '#E8F5E9' : p.status === 'W trakcie' ? '#E3F2FD' : '#F5F5F5',
                            color: p.status === 'Zakończony' ? '#2E7D32' : p.status === 'W trakcie' ? '#1565C0' : '#666',
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{p.progress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Raporty */}
          {activeTab === 'reports' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>Raporty</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6 hover:shadow-lg transition-all">
                  <h3 className="font-bold mb-2">Raport zbiorczy</h3>
                  <p className="text-gray-600 text-sm mb-4">Średnie oceny per wartość dla całej grupy</p>
                  <button className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium">
                    Podgląd
                  </button>
                </div>
                <div className="border rounded-lg p-6 hover:shadow-lg transition-all">
                  <h3 className="font-bold mb-2">Raport indywidualny</h3>
                  <p className="text-gray-600 text-sm mb-4">360° każdego uczestnika + porównanie</p>
                  <button className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium">
                    Podgląd
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Integracja */}
          {activeTab === 'integration' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>Integracja systemów</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Import z Excel</h3>
                  <p className="text-gray-600 text-sm mb-3">Załaduj listę uczestników z pliku Excel</p>
                  <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium">
                    Wybierz plik
                  </button>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Active Directory</h3>
                  <p className="text-gray-600 text-sm">Synchronizacja z Active Directory SUUS</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">API</h3>
                  <p className="text-gray-600 text-sm">Endpoint REST do integracji z systemem HR</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
