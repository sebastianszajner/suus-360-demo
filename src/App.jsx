import { useState } from 'react'
import Landing from './components/Landing'
import Survey from './components/Survey'
import Admin from './components/Admin'
import Report from './components/Report'

export default function App() {
  const [page, setPage] = useState('landing')
  const [surveyData, setSurveyData] = useState(null)

  const handleSurveySubmit = (data) => {
    setSurveyData(data)
    setPage('report')
  }

  return (
    <div className="min-h-screen bg-white">
      {page === 'landing' && <Landing onNavigate={setPage} />}
      {page === 'survey' && <Survey onSubmit={handleSurveySubmit} onBack={() => setPage('landing')} />}
      {page === 'admin' && <Admin onBack={() => setPage('landing')} />}
      {page === 'report' && <Report data={surveyData} onBack={() => setPage('landing')} />}
    </div>
  )
}
