import { motion } from 'framer-motion'
import './BrandedPack.css'

type Props = {
  phase: 'idle' | 'ripping'
  onOpenPack: () => void
}

export function BrandedPack({ phase, onOpenPack }: Props) {
  const ripping = phase === 'ripping'

  return (
    <div className="branded-pack-scene">
      <motion.div
        className="branded-pack-glow"
        animate={{ opacity: ripping ? 1.2 : 0.6, scale: ripping ? 1.08 : 1 }}
        transition={{ duration: 0.5 }}
        aria-hidden
      />

      <div className="branded-pack" role="img" aria-label="Sealed career card pack">
        <div className="branded-pack__crimp branded-pack__crimp--top" aria-hidden />
        <div className="branded-pack__crimp branded-pack__crimp--bottom" aria-hidden />

        <div className="branded-pack__rip-mask">
          <motion.div
            className="branded-pack__half branded-pack__half--left"
            animate={
              ripping
                ? { x: -72, rotateZ: -10, opacity: 0.92 }
                : { x: 0, rotateZ: 0, opacity: 1 }
            }
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="branded-pack__half-inner branded-pack__half-inner--left">
              <PackFace />
            </div>
          </motion.div>

          <motion.div
            className="branded-pack__half branded-pack__half--right"
            animate={
              ripping
                ? { x: 72, rotateZ: 10, opacity: 0.92 }
                : { x: 0, rotateZ: 0, opacity: 1 }
            }
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="branded-pack__half-inner branded-pack__half-inner--right">
              <PackFace />
            </div>
          </motion.div>
        </div>

        {ripping && (
          <motion.div
            className="branded-pack__tear-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.35, times: [0, 0.2, 1] }}
            aria-hidden
          />
        )}
      </div>

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

function PackFace() {
  return (
    <div className="branded-pack__face">
      <div className="branded-pack__foil" aria-hidden />
      <p className="branded-pack__series">Career Series</p>
      <h2 className="branded-pack__name">Jake Cohen</h2>
      <p className="branded-pack__edition">Product Marketing Edition</p>
      <p className="branded-pack__code">2026 · PMM-01</p>
      <div className="branded-pack__seal" aria-hidden>
        <span>OFFICIAL</span>
      </div>
    </div>
  )
}
