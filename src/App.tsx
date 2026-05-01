import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PackExperience } from './components/PackExperience'
import { LandingExperience } from './components/landing/LandingExperience'

function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingExperience />} />
          <Route path="/cards" element={<PackExperience />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  )
}

export default App
