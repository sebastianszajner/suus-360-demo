import { useState } from 'react'
import suusModel from '../data/suus_model.json'

export default function Survey({ onSubmit, onBack }) {
  const [currentValueIndex, setCurrentValueIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const currentValue = suusModel.values[currentValueIndex]
  const progress = ((currentValueIndex + 1) / suusModel.values.length) * 100

  const handleAnswer = (behaviorIndex, rating) => {
    const key = `${currentValueIndex}_${behaviorIndex}`
    setAnswers(prev => ({ ...prev, [key]: rating }))
  }

  const handleNext = () => {
    if (currentValueIndex < suusModel.values.length - 1) {
      setCurrentValueIndex(currentValueIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentValueIndex > 0) {
      setCurrentValueIndex(currentValueIndex - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit({
      answers,
      timestamp: new Date().toISOString(),
      model: suusModel
    })
  }

  const isLastValue = currentValueIndex === suusModel.values.length - 1
  const allAnswered = currentValue.behaviors.every((_, i) => answers[`${currentValueIndex}_${i}`])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 mb-4 font-medium"
          >
            ← Wróć
          </button>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0D47A1' }}>
            Badanie 360°
          </h1>
          <p className="text-gray-600">
            SUUS Röhlig Logistics — Model Angażującego Przywództwa
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">{currentValueIndex + 1} z 4</span>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${progress}%`, backgroundColor: currentValue.color }}
            ></div>
          </div>
        </div>

        {/* Value section */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div
            className="inline-block px-3 py-1 rounded-full mb-4 text-white font-semibold"
            style={{ backgroundColor: currentValue.color }}
          >
            {currentValue.name}
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#333' }}>
            {currentValue.name}
          </h2>
          <p className="text-gray-600 mb-8">
            {currentValue.description}
          </p>

          {/* Behaviors */}
          <div className="space-y-6">
            {currentValue.behaviors.map((behavior, idx) => (
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
                      <span className="text-sm font-medium px-2 py-1 rounded" style={{ color: currentValue.color }}>
                        {rating}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scale info */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
          <p className="text-sm font-semibold mb-3" style={{ color: '#0D47A1' }}>Skala oceny:</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {Object.entries(suusModel.scale).map(([key, value]) => (
              <div key={key}>
                <span className="font-bold" style={{ color: currentValue.color }}>
                  {key}:
                </span>
                {' '}{value}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handleBack}
            disabled={currentValueIndex === 0}
            className="px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-800"
          >
            Poprzednia
          </button>

          {isLastValue ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
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
              style={{ backgroundColor: currentValue.color }}
            >
              Następna
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Ankieta jest anonimowa. Czas wypełnienia: ok. 15 min.
        </p>
      </div>
    </div>
  )
}
