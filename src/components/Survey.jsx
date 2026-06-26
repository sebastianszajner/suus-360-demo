import { useState } from 'react'
import suusModel from '../data/suus_model.json'

export default function Survey({ onSubmit, onBack }) {
  const [currentPage, setCurrentPage] = useState('ratings')
  const [currentValueIndex, setCurrentValueIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [openQuestions, setOpenQuestions] = useState({ q27: '', q28: '' })

  const currentValue = suusModel.values[currentValueIndex]
  const progress = currentPage === 'ratings' ? ((currentValueIndex + 1) / suusModel.values.length) * 100 : 100

  const handleAnswer = (behaviorIndex, rating) => {
    const key = `${currentValueIndex}_${behaviorIndex}`
    setAnswers(prev => ({ ...prev, [key]: rating }))
  }

  const handleNext = () => {
    if (currentPage === 'ratings') {
      if (currentValueIndex < suusModel.values.length - 1) {
        setCurrentValueIndex(currentValueIndex + 1)
      } else {
        setCurrentPage('openQuestions')
      }
    }
  }

  const handleBack = () => {
    if (currentPage === 'openQuestions') {
      setCurrentPage('ratings')
      setCurrentValueIndex(suusModel.values.length - 1)
    } else if (currentValueIndex > 0) {
      setCurrentValueIndex(currentValueIndex - 1)
    }
  }

  const handleOpenQuestionChange = (field, value) => {
    setOpenQuestions(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    onSubmit({
      answers,
      openQuestions,
      timestamp: new Date().toISOString(),
      model: suusModel
    })
  }

  const allAnswered = currentValue?.behaviors.every((_, i) => answers[`${currentValueIndex}_${i}`])
  const openQuestionsAnswered = openQuestions.q27.trim().length > 10 && openQuestions.q28.trim().length > 10
  const canSubmit = currentPage === 'openQuestions' && openQuestionsAnswered

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900 mb-4 font-medium">
            ← Wróć
          </button>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0D47A1' }}>
            Ankieta 360°
          </h1>
          <p className="text-gray-600">
            SUUS Röhlig Logistics — {currentPage === 'ratings' ? 'Oceń zachowania lidera' : 'Pytania otwarte'}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">
              {currentPage === 'ratings' ? `${currentValueIndex + 1} z ${suusModel.values.length}` : 'Pytania otwarte'}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all"
              style={{ width: `${progress}%`, backgroundColor: currentPage === 'ratings' ? currentValue?.color : '#2E7D32' }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
          {currentPage === 'ratings' ? (
            <>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#333' }}>
                {currentValue?.name}
              </h2>
              <p className="text-gray-600 mb-8">{currentValue?.description}</p>

              <div className="space-y-6">
                {currentValue?.behaviors.map((behavior, idx) => (
                  <div key={idx} className="border-b pb-6 last:border-b-0">
                    <p className="font-medium mb-3" style={{ color: '#333' }}>
                      {idx + 1}. {behavior}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {['0', '1', '2', '3', '4', 'X'].map(rating => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`behavior_${currentValueIndex}_${idx}`}
                            value={rating}
                            checked={answers[`${currentValueIndex}_${idx}`] === rating}
                            onChange={() => handleAnswer(idx, rating)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm font-medium px-2 py-1 rounded" style={{ color: currentValue?.color }}>
                            {rating}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mt-8 border border-blue-200">
                <p className="text-sm font-semibold mb-3" style={{ color: '#0D47A1' }}>Skala oceny:</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(suusModel.scale).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-bold" style={{ color: currentValue?.color }}>{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>
                Pytania otwarte
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2 text-sm">
                    27. Co oceniany/a robi naprawdę dobrze jako lider?
                  </label>
                  <textarea
                    value={openQuestions.q27}
                    onChange={(e) => handleOpenQuestionChange('q27', e.target.value)}
                    placeholder="Opisz konkretne zachowanie lub sytuację (min. 2 zdania)"
                    className="w-full border rounded-lg p-3 text-sm h-24 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {openQuestions.q27.trim().length} znaków (min. 20)
                  </p>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-sm">
                    28. Jakie dwie/trzy rzeczy mogłby/łaby zrobić, by stać się lepszym liderem?
                  </label>
                  <textarea
                    value={openQuestions.q28}
                    onChange={(e) => handleOpenQuestionChange('q28', e.target.value)}
                    placeholder="Podaj konkretne sugestie (min. 2 zdania)"
                    className="w-full border rounded-lg p-3 text-sm h-24 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {openQuestions.q28.trim().length} znaków (min. 20)
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <p className="text-xs text-gray-600">
                  Pytania są anonimowe. Odpowiedzi będą dostępne dla ocenianego/ej w postaci zbiorczych cytatów.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-4 justify-between">
          <button
            onClick={handleBack}
            disabled={currentPage === 'ratings' && currentValueIndex === 0}
            className="px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-800"
          >
            Poprzednia
          </button>

          {currentPage === 'openQuestions' ? (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="px-8 py-3 rounded-lg font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ backgroundColor: '#2E7D32' }}
            >
              Wyślij ankietę
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!allAnswered}
              className="px-6 py-3 rounded-lg font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ backgroundColor: currentValue?.color }}
            >
              {isLastValue ? 'Pytania otwarte' : 'Następna'}
            </button>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Ankieta jest anonimowa. Czas wypełnienia: ok. 20 min.
        </p>
      </div>
    </div>
  )
}
