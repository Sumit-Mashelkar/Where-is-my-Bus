import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Hero from './components/Hero.jsx'
import Search from './components/search.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hero />
    <Search/>
    <App />
    
  </StrictMode>,
)
