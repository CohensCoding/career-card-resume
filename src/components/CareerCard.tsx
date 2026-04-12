import { useState, type CSSProperties } from 'react'
import type { CareerCardData } from '../data/cards'
import './CareerCard.css'

type Props = {
  card: CareerCardData
  className?: string
  style?: CSSProperties
  reducedMotion?: boolean
}

export function CareerCard({ card, className = '', style, reducedMotion }: Props) {
  const [flipped, setFlipped] = useState(false)

  const rarityClass = `career-card--${card.rarity}`

  return (
    <div
      className={`career-card-root ${className}`.trim()}
      style={style}
      data-rarity={card.rarity}
    >
      <button
        type="button"
        className={`career-card ${rarityClass} ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Show front of ${card.company} card`
            : `Show back of ${card.company} card`
        }
      >
        <div className="career-card__inner">
          <div className="career-card__face career-card__face--front">
            <div className="career-card__foil" aria-hidden />
            <div className="career-card__shine" aria-hidden />
            {card.rarity === 'legendary' && (
              <span className="career-card__one-of-one" aria-hidden>
                1/1
              </span>
            )}
            <div className="career-card__corner career-card__corner--tl" aria-hidden />
            <div className="career-card__corner career-card__corner--br" aria-hidden />

            <div className="career-card__ribbon">{card.tierLabel}</div>

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
          </div>

          <div className="career-card__face career-card__face--back">
            <div className="career-card__foil career-card__foil--back" aria-hidden />
            <p className="career-card__company">{card.company}</p>
            <h3 className="career-card__back-title">{card.backTitle}</h3>
            <p className="career-card__theme">{card.theme}</p>
            <p className="career-card__body">{card.backBody}</p>
            {card.specialTag && (
              <p className="career-card__special">{card.specialTag}</p>
            )}
            <dl className="career-card__stats">
              {card.stats.map((s) => (
                <div key={s.label} className="career-card__stat-row">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            {card.flavor && (
              <p className="career-card__flavor">“{card.flavor}”</p>
            )}
            <p className="career-card__tap-hint">
              {reducedMotion ? 'Click to flip' : 'Tap to flip'}
            </p>
          </div>
        </div>
      </button>
    </div>
  )
}
