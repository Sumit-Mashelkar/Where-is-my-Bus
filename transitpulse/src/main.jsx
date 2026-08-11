import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LandingPage from './pages/landingPage.jsx'
import ResultsPage from './pages/resultsPage.jsx'
import ErrorPage from './components/ErrorPage.jsx'


const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <Router>
    <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/resultsPage" element={<ResultsPage />} />
            <Route path="/error" element={<ErrorPage />} />
            {/* <Route path="/search" element={<ResultsPage/>}/> */}
          </Routes>
    </Router>
  </StrictMode>,
)