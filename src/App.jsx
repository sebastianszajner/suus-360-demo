import { useState } from 'react'
import Landing from './components/Landing'
import Survey from './components/Survey'
import AdminWizard from './components/AdminWizard'
import Report from './components/Report'
import FullReport from './components/FullReport'

export default function App() {
  const [page, setPage] = useState('landing')
  const [surveyData, setSurveyData] = useState(null)
  const [fullReportMode, setFullReportMode] = useState(false)

  const handleSurveySubmit = (data) => {
    setSurveyData(data)
    setPage('report')
  }

  const handleViewFullReport = () => {
    setFullReportMode(true)
    setPage('report')
  }

  return (
    <div className="min-h-screen bg-white">
      {page === 'landing' && (
        <Landing onNavigate={(newPage) => {
          setPage(newPage)
          if (newPage === 'survey') setFullReportMode(false)
        }} />
      )}
      {page === 'survey' && <Survey onSubmit={handleSurveySubmit} onBack={() => setPage('landing')} />}
      {page === 'admin' && <AdminWizard onBack={() => setPage('landing')} />}
      {page === 'report' && (
        fullReportMode ? (
          <FullReport data={surveyData} onBack={() => { setPage('landing'); setFullReportMode(false); }} />
        ) : (
          <Report data={surveyData} onBack={() => setPage('landing')} onViewFull={handleViewFullReport} />
        )
      )}
    </div>
  )
}
