import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BootSequence } from './BootSequence'
import { FileInspector } from './FileInspector'
import { MemoryCard, type MemoryCardHandle } from './MemoryCard'
import { PROJECTS } from './projects'
import './LandingExperience.css'

export function LandingExperience() {
  const [bootDone, setBootDone] = useState(() => sessionStorage.getItem('cohen.bootSeen') === '1')
  const [bootRunKey, setBootRunKey] = useState(0)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const memRef = useRef<MemoryCardHandle | null>(null)

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null
    return PROJECTS.find((p) => p.id === selectedProjectId) ?? null
  }, [selectedProjectId])

  const onBootComplete = useCallback(() => {
    sessionStorage.setItem('cohen.bootSeen', '1')
    setBootDone(true)
    // Match HTML behavior: focus first slot after boot fades.
    window.setTimeout(() => memRef.current?.focusIndex(0), 40)
  }, [])

  const relaunchIntro = useCallback(() => {
    setSelectedProjectId(null)
    sessionStorage.removeItem('cohen.bootSeen')
    setBootDone(false)
    setBootRunKey((k) => k + 1)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProjectId) {
        setSelectedProjectId(null)
        return
      }

      if (selectedProjectId) return

      switch (e.key) {
        case 'ArrowRight':
          memRef.current?.moveFocus(1)
          break
        case 'ArrowLeft':
          memRef.current?.moveFocus(-1)
          break
        case 'ArrowDown':
          memRef.current?.moveFocusByRow(1)
          break
        case 'ArrowUp':
          memRef.current?.moveFocusByRow(-1)
          break
        case 'Enter':
          memRef.current?.openFocused()
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedProjectId])

  return (
    <div className="landing-experience">
      <div className="stage" aria-hidden />

      <MemoryCard
        ref={memRef}
        visible={bootDone}
        onSelectProject={(id) => setSelectedProjectId(id)}
        onRelaunchIntro={relaunchIntro}
      />

      {!bootDone && <BootSequence key={bootRunKey} onComplete={onBootComplete} />}

      {selectedProject && (
        <FileInspector project={selectedProject} onClose={() => setSelectedProjectId(null)} />
      )}
    </div>
  )
}

