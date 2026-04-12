import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CAREER_CARDS } from '../data/cards'
import { BrandedPack } from './BrandedPack'
import { CareerCard } from './CareerCard'
import './PackExperience.css'

type Phase = 'landing' | 'ripping' | 'bursting' | 'gallery'

const RIP_MS = 780
const BURST_STAGGER = 0.11
/** After last card spring, settle into gallery layout */
const BURST_TAIL_MS = 950

export function PackExperience() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('landing')
  const ripTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openPack = useCallback(() => {
    if (reduceMotion) {
      setPhase('gallery')
      return
    }
    setPhase('ripping')
    ripTimer.current = setTimeout(() => {
      setPhase('bursting')
    }, RIP_MS)
  }, [reduceMotion])

  useEffect(() => {
    return () => {
      if (ripTimer.current) clearTimeout(ripTimer.current)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'bursting' || reduceMotion) return
    const n = CAREER_CARDS.length
    const delayMs = (n - 1) * BURST_STAGGER * 1000 + BURST_TAIL_MS
    const t = setTimeout(() => setPhase('gallery'), delayMs)
    return () => clearTimeout(t)
  }, [phase, reduceMotion])

  return (
    <div className="pack-experience">
      <header className="pack-experience__hero">
        <motion.h1
          className="pack-experience__headline"
          initial={false}
          animate={{
            opacity: phase === 'gallery' ? 0.88 : 1,
            y: phase === 'gallery' ? -8 : 0,
            scale: phase === 'gallery' ? 0.9 : 1,
          }}
          transition={{ duration: 0.45 }}
        >
          Unpack a Product Marketer
          <span className="pack-experience__subhead">Built for AI and Growth</span>
        </motion.h1>
      </header>

      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div
            key="landing"
            className="pack-experience__stage pack-experience__stage--landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            <BrandedPack phase="idle" onOpenPack={openPack} />
          </motion.div>
        )}

        {phase === 'ripping' && (
          <motion.div
            key="ripping"
            className="pack-experience__stage pack-experience__stage--ripping"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <BrandedPack phase="ripping" onOpenPack={openPack} />
          </motion.div>
        )}
      </AnimatePresence>

      {(phase === 'bursting' || phase === 'gallery') && (
        <div
          className={`pack-experience__cards-wrap pack-experience__cards-wrap--${phase}`}
        >
          {phase === 'gallery' && (
            <p className="pack-experience__pull-label">Your career pull</p>
          )}
          <div className="pack-experience__cards">
            {CAREER_CARDS.map((card, i) => (
              <BurstCard
                key={card.id}
                index={i}
                total={CAREER_CARDS.length}
                phase={phase}
                reduceMotion={!!reduceMotion}
              >
                <CareerCard card={card} reducedMotion={!!reduceMotion} />
              </BurstCard>
            ))}
          </div>
        </div>
      )}

      <footer className="pack-experience__footer">
        <a
          className="pack-experience__resume-link"
          href="/jake-cohen-resume-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Full résumé (PDF)
        </a>
      </footer>
    </div>
  )
}

type BurstProps = {
  children: ReactNode
  index: number
  total: number
  phase: Phase
  reduceMotion: boolean
}

function BurstCard({
  children,
  index,
  total,
  phase,
  reduceMotion,
}: BurstProps) {
  const mid = (total - 1) / 2
  const spread = 118
  const targetX = (index - mid) * spread

  return (
    <motion.div
      className="pack-experience__burst-card"
      initial={
        reduceMotion || phase === 'gallery'
          ? false
          : {
              x: 0,
              y: 120,
              scale: 0.35,
              opacity: 0,
              rotateZ: -18 + index * 6,
            }
      }
      animate={
        reduceMotion
          ? { x: 0, y: 0, scale: 1, opacity: 1, rotateZ: 0 }
          : phase === 'bursting'
            ? {
                x: targetX,
                y: 0,
                scale: 1,
                opacity: 1,
                rotateZ: 0,
                transition: {
                  delay: index * BURST_STAGGER,
                  type: 'spring',
                  stiffness: 280,
                  damping: 24,
                },
              }
            : {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                rotateZ: 0,
                transition: {
                  type: 'spring',
                  stiffness: 340,
                  damping: 30,
                },
              }
      }
      layout={phase === 'gallery'}
    >
      {children}
    </motion.div>
  )
}
