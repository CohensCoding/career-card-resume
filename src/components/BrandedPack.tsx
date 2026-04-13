import { motion, useReducedMotion } from 'framer-motion'
import './BrandedPack.css'

type Props = {
  phase: 'idle' | 'ripping'
  onOpenPack: () => void
}

const RIP_DURATION = 1.38

export function BrandedPack({ phase, onOpenPack }: Props) {
  const ripping = phase === 'ripping'
  const reduceMotion = useReducedMotion()

  return (
    <div className="branded-pack-scene">
      <motion.div
        className="branded-pack-glow"
        animate={{ opacity: ripping ? 1.05 : 0.88, scale: ripping ? 1.04 : 1 }}
        transition={{ duration: 0.55 }}
        aria-hidden
      />

      <motion.div
        className="branded-pack-float"
        animate={
          ripping
            ? { y: 14, rotateX: 0, rotateY: 0, rotateZ: 0 }
            : reduceMotion
              ? { y: 0, rotateX: 0, rotateY: 0, rotateZ: 0 }
              : {
                  y: [0, -14, 0],
                  rotateX: 0,
                  rotateY: [-4, 4, -4],
                  rotateZ: [0, 0.6, 0],
                }
        }
        transition={
          ripping
            ? { duration: 0.5 }
            : reduceMotion
              ? { duration: 0 }
              : {
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
        }
      >
        <div className="branded-pack" role="img" aria-label="Sealed foil trading card pack">
          <div className="branded-pack__crimp branded-pack__crimp--top" aria-hidden />
          <div className="branded-pack__crimp branded-pack__crimp--bottom" aria-hidden />

          <div className="branded-pack__rip-mask">
            <motion.div
              className="branded-pack__half branded-pack__half--left"
              animate={
                ripping
                  ? { x: -96, rotateZ: -11, opacity: 0.92 }
                  : { x: 0, rotateZ: 0, opacity: 1 }
              }
              transition={{
                duration: reduceMotion ? 0.01 : RIP_DURATION,
                ease: [0.19, 1, 0.32, 1],
              }}
            >
              <div className="branded-pack__half-inner branded-pack__half-inner--left">
                <FoilPackFace />
              </div>
            </motion.div>

            <motion.div
              className="branded-pack__half branded-pack__half--right"
              animate={
                ripping
                  ? { x: 96, rotateZ: 11, opacity: 0.92 }
                  : { x: 0, rotateZ: 0, opacity: 1 }
              }
              transition={{
                duration: reduceMotion ? 0.01 : RIP_DURATION,
                ease: [0.19, 1, 0.32, 1],
              }}
            >
              <div className="branded-pack__half-inner branded-pack__half-inner--right">
                <FoilPackFace />
              </div>
            </motion.div>
          </div>

          {ripping && (
            <>
              <motion.div
                className="branded-pack__tear-flash"
                initial={{ opacity: 0, scaleY: 0.35 }}
                animate={{ opacity: [0, 1, 0.4, 0], scaleY: 1 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.88,
                  times: [0, 0.12, 0.38, 1],
                }}
                aria-hidden
              />
              <motion.div
                className="branded-pack__tear-crack"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0] }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.95,
                  times: [0, 0.18, 1],
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
