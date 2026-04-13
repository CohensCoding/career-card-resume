import { PackExperience } from './components/PackExperience'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <PackExperience />
      <Analytics />
    </div>
  )
}

export default App
