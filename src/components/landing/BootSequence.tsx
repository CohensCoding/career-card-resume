import { useEffect, useMemo, useRef, useState } from 'react'
import './BootSequence.css'

type Props = {
  onComplete: () => void
}

const T = {
  startConstruct: 300,
  startFilled: 2200,
  // start the spin/shine sooner (shorter hold after JC appears)
  startTransition: 2700,
  // keep the same relative offsets as the original choreography
  startPhase2: 4000, // +1300ms
  // show system text after the cream→black transition
  startSystem: 4200, // +200ms
  ctaReady: 5500, // +1300ms
} as const

export function BootSequence({ onComplete }: Props) {
  const [classes, setClasses] = useState<string[]>([])
  const [gone, setGone] = useState(false)
  const timers = useRef<number[]>([])
  const particles = useRef<
    Array<{
      id: string
      style: React.CSSProperties
    }>
  >([])

  const className = useMemo(() => {
    const s = new Set(classes)
    if (gone) s.add('gone')
    return ['boot-sequence', ...Array.from(s)].join(' ')
  }, [classes, gone])

  const clearAllTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const addClass = (c: string) => setClasses((prev) => (prev.includes(c) ? prev : [...prev, c]))

  const generateBurstParticles = () => {
    const count = 60
    const next: typeof particles.current = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 500 + Math.random() * 600
      const xEnd = Math.cos(angle) * distance
      const yEnd = Math.sin(angle) * distance
      const rotDeg = (Math.atan2(yEnd, xEnd) * 180) / Math.PI - 90

      next.push({
        id: `${i}-${Math.random().toString(16).slice(2)}`,
        style: {
          ['--x-end' as never]: `${xEnd}px`,
          ['--y-end' as never]: `${yEnd}px`,
          ['--rot' as never]: `${rotDeg}deg`,
          ['--dur' as never]: `${1.0 + Math.random() * 0.8}s`,
          ['--delay' as never]: `${Math.random() * 0.4}s`,
        } as React.CSSProperties,
      })
    }
    particles.current = next
  }

  const schedule = () => {
    timers.current.push(window.setTimeout(() => addClass('constructing'), T.startConstruct))
    timers.current.push(window.setTimeout(() => addClass('filled'), T.startFilled))
    timers.current.push(
      window.setTimeout(() => {
        generateBurstParticles()
        addClass('transitioning')
      }, T.startTransition),
    )
    timers.current.push(window.setTimeout(() => addClass('phase-2'), T.startPhase2))
    timers.current.push(window.setTimeout(() => addClass('system-typing'), T.startSystem))
    timers.current.push(window.setTimeout(() => addClass('cta-ready'), T.ctaReady))
  }

  const skipToEnd = () => {
    clearAllTimers()
    addClass('constructing')
    addClass('filled')
    generateBurstParticles()
    addClass('transitioning')
    timers.current.push(window.setTimeout(() => addClass('phase-2'), 50))
    timers.current.push(window.setTimeout(() => addClass('system-typing'), 120))
    timers.current.push(window.setTimeout(() => addClass('cta-ready'), 1500))
  }

  const finishBoot = () => {
    if (!classes.includes('cta-ready')) return
    if (gone) return
    setGone(true)
    window.setTimeout(() => onComplete(), 800)
  }

  useEffect(() => {
    schedule()
    return () => clearAllTimers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={className}
      onClick={(e) => {
        const target = e.target as HTMLElement | null
        if (target?.closest('.boot-skip')) return
        finishBoot()
      }}
      role="presentation"
    >
      <div className="boot-bg" />
      <div className="boot-bg-dark" />

      <div className="boot-particles" aria-hidden>
        {particles.current.map((p) => (
          <div key={p.id} className="particle" style={p.style} />
        ))}
      </div>
      <div className="boot-flash" aria-hidden />

      <div className="boot-corner">/ COHEN.SYSTEM · v2.0</div>

      <div className="boot-diamond" aria-hidden>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="boot-dFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4d8a8" />
              <stop offset="35%" stopColor="#d4842a" />
              <stop offset="75%" stopColor="#b85c1a" />
              <stop offset="100%" stopColor="#7a3812" />
            </linearGradient>
            <linearGradient id="boot-dShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff5db" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#fff5db" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="boot-dShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5a2010" stopOpacity="0" />
              <stop offset="100%" stopColor="#3a1408" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <line className="construct-line l-1" x1="100" y1="12" x2="188" y2="100" />
          <line className="construct-line l-2" x1="188" y1="100" x2="100" y2="188" />
          <line className="construct-line l-3" x1="100" y1="188" x2="12" y2="100" />
          <line className="construct-line l-4" x1="12" y1="100" x2="100" y2="12" />

          <g className="diamond-fill">
            <polygon points="100,12 188,100 100,188 12,100" fill="url(#boot-dFace)" />
            <polygon points="100,12 188,100 100,188 12,100" fill="url(#boot-dShadow)" />
            <polygon points="100,12 100,100 12,100" fill="url(#boot-dShine)" opacity="0.85" />
            <polygon
              points="100,30 170,100 100,170 30,100"
              fill="none"
              stroke="rgba(255,235,200,0.22)"
              strokeWidth="0.8"
            />
          </g>

          <g className="diamond-mono">
            <text
              x="100"
              y="118"
              textAnchor="middle"
              fontFamily="Instrument Serif, serif"
              fontWeight="400"
              fontSize="58"
              fontStyle="italic"
              fill="#fff5db"
            >
              JC
            </text>
          </g>
        </svg>
      </div>

      <div className="boot-system">
        <div className="system-line system-line-1">cohen.system / boot sequence</div>
        <div className="system-line system-line-2">// boot complete</div>
      </div>

      <div className="boot-wordmark">Jake Cohen</div>
      <div className="boot-tag">portfolio</div>

      <div className="boot-cta" onClick={finishBoot}>
        click anywhere to begin
      </div>

      <button type="button" className="boot-skip" onClick={skipToEnd}>
        Skip →
      </button>
    </div>
  )
}

