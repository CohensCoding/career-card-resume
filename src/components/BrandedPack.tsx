import { motion, useReducedMotion } from 'framer-motion'
import './BrandedPack.css'

type Props = {
  phase: 'idle' | 'ripping'
  onOpenPack: () => void
}

/** Anticipation hold + main rip motion — keep in sync with PackExperience RIP_MS */
const RIP_ANTICIPATION_S = 0.28
const RIP_MOTION_S = 0.82
const RIP_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function BrandedPack({ phase, onOpenPack }: Props) {
  const ripping = phase === 'ripping'
  const reduceMotion = useReducedMotion()

  const ripTransition = {
    delay: reduceMotion ? 0 : RIP_ANTICIPATION_S,
    duration: reduceMotion ? 0.01 : RIP_MOTION_S,
    ease: RIP_EASE,
  }

  return (
    <div className="branded-pack-scene">
      <motion.div
        className="branded-pack-glow"
        animate={
          ripping
            ? { opacity: 1.12, scale: 1.08 }
            : reduceMotion
              ? { opacity: 0.92, scale: 1 }
              : { opacity: [0.88, 1, 0.88], scale: [1, 1.03, 1] }
        }
        transition={
          ripping
            ? { duration: 0.42, ease: RIP_EASE }
            : reduceMotion
              ? { duration: 0 }
              : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
        }
        aria-hidden
      />

      <motion.div
        className="branded-pack-float"
        animate={
          ripping
            ? { y: 10, rotateX: 2, rotateY: 0, rotateZ: 0, scale: 1 }
            : reduceMotion
              ? { y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 }
              : {
                  y: [0, -14, 0],
                  rotateX: 0,
                  rotateY: [-4, 4, -4],
                  rotateZ: [0, 0.6, 0],
                  scale: 1,
                }
        }
        transition={
          ripping
            ? { duration: 0.45, ease: RIP_EASE }
            : reduceMotion
              ? { duration: 0 }
              : {
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
        }
      >
        <div className={`branded-pack ${ripping ? 'branded-pack--ripping' : ''}`} role="img" aria-label="Sealed foil trading card pack">
          <div className={`branded-pack__rip-mask ${ripping ? 'is-ripping' : ''}`}>
            <motion.div
              className="branded-pack__half branded-pack__half--left"
              animate={
                ripping
                  ? {
                      x: -112,
                      y: -36,
                      rotateZ: -15,
                      rotateY: -18,
                      opacity: 0.9,
                      filter: reduceMotion ? 'blur(0px)' : 'blur(1.2px)',
                    }
                  : {
                      x: 0,
                      y: 0,
                      rotateZ: 0,
                      rotateY: 0,
                      opacity: 1,
                      filter: 'blur(0px)',
                    }
              }
              transition={ripTransition}
            >
              <div className="branded-pack__half-inner branded-pack__half-inner--left">
                <FoilPackFace />
              </div>
            </motion.div>

            <motion.div
              className="branded-pack__half branded-pack__half--right"
              animate={
                ripping
                  ? {
                      x: 112,
                      y: -36,
                      rotateZ: 15,
                      rotateY: 18,
                      opacity: 0.9,
                      filter: reduceMotion ? 'blur(0px)' : 'blur(1.2px)',
                    }
                  : {
                      x: 0,
                      y: 0,
                      rotateZ: 0,
                      rotateY: 0,
                      opacity: 1,
                      filter: 'blur(0px)',
                    }
              }
              transition={ripTransition}
            >
              <div className="branded-pack__half-inner branded-pack__half-inner--right">
                <FoilPackFace />
              </div>
            </motion.div>
          </div>

          {ripping && (
            <>
              <motion.div
                className="branded-pack__tear-burst"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.85, 0], scale: [0.6, 1.35, 1.55] }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.72,
                  ease: RIP_EASE,
                  delay: reduceMotion ? 0 : RIP_ANTICIPATION_S * 0.85,
                }}
                aria-hidden
              />
              <motion.div
                className="branded-pack__tear-flash"
                initial={{ opacity: 0, scaleY: 0.35 }}
                animate={{ opacity: [0, 0.95, 0.28, 0], scaleY: 1 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.72,
                  times: [0, 0.14, 0.4, 1],
                  delay: reduceMotion ? 0 : RIP_ANTICIPATION_S * 0.92,
                  ease: RIP_EASE,
                }}
                aria-hidden
              />
              <motion.div
                className="branded-pack__tear-crack"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.28, 0] }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.55,
                  times: [0, 0.22, 1],
                  delay: reduceMotion ? 0 : RIP_ANTICIPATION_S * 0.95,
                  ease: RIP_EASE,
                }}
                aria-hidden
              />
            </>
          )}
        </div>
      </motion.div>

      {!ripping && (
        <motion.button
          type="button"
          className="branded-pack__cta"
          onClick={onOpenPack}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Open Pack
        </motion.button>
      )}
    </div>
  )
}

/** Premium vertical foil wrapper — physical pack, not a UI card. */
function FoilPackFace() {
  return (
    <div className="foil-pack">
      <div className="foil-pack__base" aria-hidden />
      <div className="foil-pack__grain" aria-hidden />
      <div className="foil-pack__wrinkle" aria-hidden />
      <div className="foil-pack__sweep" aria-hidden />
      <div className="foil-pack__vignette" aria-hidden />

      <div className="foil-pack__edge foil-pack__edge--top" aria-hidden />
      <div className="foil-pack__edge foil-pack__edge--bottom" aria-hidden />

      <header className="foil-pack__banner">
        <span className="foil-pack__banner-text">PMM SERIES • 2026 DROP</span>
      </header>
      <div className="foil-pack__banner-rule" aria-hidden />

      <div className="foil-pack__hero">
        <h2 className="foil-pack__title">
          <span className="foil-pack__title-line foil-pack__title-line--primary">Product Marketing</span>
          <span className="foil-pack__title-line foil-pack__title-line--secondary">Career Trading Cards</span>
        </h2>
      </div>

      <div className="foil-pack__mystery" aria-hidden>
        <div className="foil-pack__mystery-glow" />
        <div className="foil-pack__mystery-stack">
          <span className="foil-pack__mystery-card foil-pack__mystery-card--1" />
          <span className="foil-pack__mystery-card foil-pack__mystery-card--2" />
          <span className="foil-pack__mystery-card foil-pack__mystery-card--3" />
        </div>
      </div>

      <div className="foil-pack__descriptor-wrap">
        <p className="foil-pack__descriptor">Built for high growth teams</p>
      </div>

      <footer className="foil-pack__footer">
        <p className="foil-pack__seal">
          <span className="foil-pack__seal-line">Foundation set</span>
          <span className="foil-pack__seal-dot" aria-hidden>
            {' · '}
          </span>
          <span className="foil-pack__seal-line">Series 1</span>
        </p>
      </footer>
    </div>
  )
}
