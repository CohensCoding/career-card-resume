import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CAREER_CARDS } from '../data/cards'
import { BrandedPack } from './BrandedPack'
import { CareerCard } from './CareerCard'
import './PackExperience.css'

type Phase = 'landing' | 'ripping' | 'stack' | 'gallery'

/** Matches BrandedPack: RIP_ANTICIPATION_S + RIP_MOTION_S + reveal tail */
const RIP_MS = 1750
const DEAL_GAP_MS = 440

export function PackExperience() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('landing')
  const [sessionKey, setSessionKey] = useState(0)
  const [stackDealCount, setStackDealCount] = useState(0)
  const [stackTopIndex, setStackTopIndex] = useState(0)
  const [expandedGalleryId, setExpandedGalleryId] = useState<string | null>(null)

  const ripTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dealTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  const n = CAREER_CARDS.length
  const stackReady = stackDealCount >= n
  const isLastInStack = stackTopIndex >= n - 1

  const resetPack = useCallback(() => {
    if (ripTimer.current) {
      clearTimeout(ripTimer.current)
      ripTimer.current = null
    }
    dealTimers.current.forEach(clearTimeout)
    dealTimers.current = []
    setExpandedGalleryId(null)
    setStackDealCount(0)
    setStackTopIndex(0)
    setSessionKey((k) => k + 1)
    setPhase('landing')
  }, [])

  const openPack = useCallback(() => {
    if (reduceMotion) {
      setPhase('stack')
      return
    }
    setPhase('ripping')
    ripTimer.current = setTimeout(() => {
      setPhase('stack')
    }, RIP_MS)
  }, [reduceMotion])

  useEffect(() => {
    return () => {
      if (ripTimer.current) clearTimeout(ripTimer.current)
      dealTimers.current.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    dealTimers.current.forEach(clearTimeout)
    dealTimers.current = []

    if (phase !== 'stack') return

    if (reduceMotion) {
      setStackDealCount(n)
      setStackTopIndex(0)
      return
    }

    setStackDealCount(0)
    setStackTopIndex(0)

    for (let i = 1; i <= n; i++) {
      const t = window.setTimeout(() => setStackDealCount(i), DEAL_GAP_MS * i)
      dealTimers.current.push(t)
    }

    return () => {
      dealTimers.current.forEach(clearTimeout)
      dealTimers.current = []
    }
  }, [phase, reduceMotion, n])

  const goNextStack = () => {
    if (!stackReady) return
    if (isLastInStack) {
      setPhase('gallery')
      setExpandedGalleryId(null)
      return
    }
    setStackTopIndex((s) => s + 1)
  }

  const expandedCard = expandedGalleryId
    ? CAREER_CARDS.find((c) => c.id === expandedGalleryId)
    : null

  useEffect(() => {
    if (!expandedGalleryId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedGalleryId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expandedGalleryId])

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
          Looking for a new marketer?
          <span className="pack-experience__subhead">
            Rip a pack of candidates and see who you get
          </span>
        </motion.h1>
      </header>

      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div
            key={`landing-${sessionKey}`}
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

      {phase === 'stack' && (
        <div className="pack-experience__stack-stage">
          <div className="pack-experience__stack-stage-bg" aria-hidden />
          <div className="pack-experience__stack-pile-wrap">
            <div className="pack-experience__stack-pile">
              {CAREER_CARDS.map((card, i) => {
                if (i >= stackDealCount || i < stackTopIndex) return null
                const depth = i - stackTopIndex
                const isTop = depth === 0
                const isHit = isTop && stackReady && (card.rarity === 'bonus' || card.rarity === 'legendary')

                return (
                  <motion.div
                    key={card.id}
                    className="pack-experience__stack-layer"
                    initial={
                      reduceMotion
                        ? false
                        : { x: '-50%', y: 140, opacity: 0, scale: 0.82, rotateZ: -6 }
                    }
                    animate={{
                      x: '-50%',
                      y: depth * 16,
                      opacity: 1,
                      scale: 1 - depth * 0.028,
                      rotateZ: depth * 1.2,
                      zIndex: 50 - depth,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 26,
                    }}
                    style={{
                      left: '50%',
                      pointerEvents: stackReady && isTop ? 'auto' : 'none',
                    }}
                  >
                    {isHit && (
                      <div
                        className={`pack-experience__hit-fx pack-experience__hit-fx--${card.rarity}`}
                        aria-hidden
                      >
                        <div className="pack-experience__hit-glow" />
                        <div className="pack-experience__hit-sparkles" />
                      </div>
                    )}
                    <CareerCard
                      card={card}
                      variant="stack"
                      reducedMotion={!!reduceMotion}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="pack-experience__stack-actions">
            <span className="pack-experience__stack-count">
              {stackReady
                ? `Card ${stackTopIndex + 1} of ${n}`
                : `Dealing… ${stackDealCount}/${n}`}
            </span>
            <span className="pack-experience__stack-flip-hint" aria-hidden>
              Click card to flip
            </span>
            <button
              type="button"
              className="pack-experience__stack-next"
              disabled={!stackReady}
              onClick={goNextStack}
            >
              {isLastInStack ? 'Lay out collection' : 'Next card'}
            </button>
          </div>
        </div>
      )}

      {phase === 'gallery' && (
        <motion.div
          className="pack-experience__cards-wrap pack-experience__cards-wrap--gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          {!reduceMotion && (
            <div className="pack-experience__confetti" aria-hidden>
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} className={`pack-experience__confetti-bit pack-experience__confetti-bit--${i % 7}`} />
              ))}
            </div>
          )}
          <p className="pack-experience__pull-label">Your career pull</p>
          <div className="pack-experience__cards">
            {CAREER_CARDS.map((card) => (
              <div key={card.id} className="pack-experience__gallery-cell">
                <motion.div
                  layout
                  className="pack-experience__gallery-thumb"
                  onClick={() => setExpandedGalleryId(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setExpandedGalleryId(card.id)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open large view of ${card.company}`}
                >
                  <CareerCard
                    card={card}
                    variant="gallery"
                    presentation="frontOnly"
                    reducedMotion={!!reduceMotion}
                  />
                </motion.div>
                <span className="pack-experience__tier-label pack-experience__tier-label--gallery">
                  {card.tierLabel}
                </span>
              </div>
            ))}
          </div>
          <div className="pack-experience__gallery-actions">
            <button type="button" className="pack-experience__reopen-pack" onClick={resetPack}>
              Reseal &amp; rip again
            </button>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {expandedCard && (
          <motion.div
            key="lightbox"
            className="pack-experience__lightbox"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setExpandedGalleryId(null)}
          >
            <motion.div
              className="pack-experience__lightbox-panel"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="pack-experience__lightbox-close"
                onClick={() => setExpandedGalleryId(null)}
                aria-label="Close card view"
              >
                ×
              </button>
              <div className="pack-experience__lightbox-card-wrap">
                <CareerCard
                  key={expandedCard.id}
                  card={expandedCard}
                  variant="expanded"
                  reducedMotion={!!reduceMotion}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
