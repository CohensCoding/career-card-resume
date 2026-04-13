import { useState, type CSSProperties } from 'react'
import type { CareerCardData } from '../data/cards'
import './CareerCard.css'

export type CareerCardVariant = 'stack' | 'gallery' | 'expanded'

type Props = {
  card: CareerCardData
  className?: string
  style?: CSSProperties
  reducedMotion?: boolean
  variant?: CareerCardVariant
  presentation?: 'full' | 'frontOnly'
}

export function CareerCard({
  card,
  className = '',
  style,
  reducedMotion = false,
  variant = 'stack',
  presentation = 'full',
}: Props) {
  const [flipped, setFlipped] = useState(false)

  const rarityClass = `career-card--${card.rarity}`
  const showThemeLine =
    card.theme.trim().toLowerCase() !== card.backTitle.trim().toLowerCase()

  const hint = 'Click card to flip'

  const frontFace = (
    <>
      <div className="career-card__foil" aria-hidden />
      <div className="career-card__shine" aria-hidden />
      <div className="career-card__corner career-card__corner--tl" aria-hidden />
      <div
        className={`career-card__corner career-card__corner--br ${card.rarity === 'legendary' ? 'is-hidden' : ''}`}
        aria-hidden
      />

      <div className="career-card__art">
        {card.frontImageSrc ? (
          <img
            src={card.frontImageSrc}
            alt={card.frontAlt}
            className="career-card__img"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div
            className="career-card__placeholder"
            style={{ '--ph-hue': card.frontPlaceholderHue } as CSSProperties}
          >
            <span className="career-card__placeholder-co">COHEN</span>
            <span className="career-card__placeholder-era">{card.company}</span>
            <span className="career-card__placeholder-hint">Card art</span>
          </div>
        )}
      </div>

      {!card.frontImageSrc && (
        <div className="career-card__front-footer">
          <span className="career-card__name">Jake Cohen</span>
          <span className="career-card__role">{card.role}</span>
        </div>
      )}
    </>
  )

  const backFace = (
    <>
      <div className="career-card__foil career-card__foil--back" aria-hidden />
      <div className="career-card__back-scroller">
        <header className="career-card__back-header">
          <p className="career-card__role-line">{card.role}</p>
          <p className="career-card__company">{card.company}</p>
          <h3 className="career-card__back-title">{card.backTitle}</h3>
          {showThemeLine && <p className="career-card__theme">{card.theme}</p>}
        </header>

        <p className="career-card__body">{card.backBody}</p>
        {card.specialTag && (
          <p className="career-card__special-badge">{card.specialTag}</p>
        )}
        <div className="career-card__stats-panel">
          <p className="career-card__stats-heading">Career highlights</p>
          <dl className="career-card__stats">
            {card.stats.map((s) => (
              <div key={s.label} className="career-card__stat-row">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {card.flavor && <p className="career-card__flavor">“{card.flavor}”</p>}
        <p className="career-card__tap-hint">{hint}</p>
      </div>
    </>
  )

  if (presentation === 'frontOnly') {
    return (
      <div
        className={`career-card-root career-card-root--${variant} career-card-root--front-only ${className}`.trim()}
        style={style}
        data-rarity={card.rarity}
      >
        <div className={`career-card ${rarityClass}`}>
          <div className="career-card__inner career-card__inner--static">
            <div className="career-card__face career-card__face--front">{frontFace}</div>
          </div>
        </div>
      </div>
    )
  }

  const toggleFlip = () => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(12)
    }
    setFlipped((f) => !f)
  }

  return (
    <div
      className={`career-card-root career-card-root--${variant} ${className}`.trim()}
      style={style}
      data-rarity={card.rarity}
    >
      <button
        type="button"
        className={`career-card ${rarityClass}`}
        onClick={toggleFlip}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Show front of ${card.company} card`
            : `Show back of ${card.company} card`
        }
      >
        <div
          className={`career-card__inner ${flipped ? 'is-flipped' : ''} ${reducedMotion ? 'career-card__inner--reduced-motion' : ''}`.trim()}
        >
          <div className="career-card__face career-card__face--front card-front">{frontFace}</div>

          <div className="career-card__face career-card__face--back card-back">{backFace}</div>
        </div>
      </button>
    </div>
  )
}
