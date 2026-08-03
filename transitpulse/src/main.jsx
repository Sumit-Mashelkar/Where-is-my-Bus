import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LandingPage from './pages/landingPage.jsx'
import resultsPage from './pages/resultsPage.jsx'

<Router>
    <Routes>
      
            <Route path="/" element={<LandingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            
    </Routes>

</Router>


// const root = createRoot(document.getElementById('root'))
// root.render(
//   <StrictMode>
//     <LandingPage />    
//   </StrictMode>,
// )