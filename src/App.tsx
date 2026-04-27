import { PackExperience } from './components/PackExperience'
import './App.css'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className="app-shell">
      <PackExperience />
      <Analytics />
    </div>
  )
}

export default App
