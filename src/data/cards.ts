export type Rarity = 'rookie' | 'rare' | 'epic' | 'legendary' | 'bonus'

export type CareerStat = { label: string; value: string }

export type CareerCardData = {
  id: string
  rarity: Rarity
  /** Ribbon: Rookie → Builder → Operator → All Star → Bonus */
  tierLabel: string
  company: string
  role: string
  theme: string
  frontImageSrc: string | null
  frontAlt: string
  frontPlaceholderHue: number
  backTitle: string
  /** Longer narrative for card back (top section) */
  backBody: string
  /** Tight accomplishment lines (table) */
  stats: CareerStat[]
  flavor?: string
  specialTag?: string
}

/**
 * Order: Rookie → Fama (Builder) → Hopps (Operator) → Legendary (All Star) → Bonus.
 * Ribbons left-to-right: Rookie, Builder, Operator, All Star, Bonus.
 *
 * `public/cards/*.png` names must match these paths exactly (lowercase); many hosts
 * use case-sensitive URLs, so `Fama.png` will 404 for `/cards/fama.png`.
 */
export const CAREER_CARDS: CareerCardData[] = [
  {
    id: 'rookie',
    rarity: 'rookie',
    tierLabel: 'Rookie',
    company: 'Cartoon Network / Food Network',
    role: 'Marketing Coordinator',
    theme: 'Foundation Builder',
    frontImageSrc: '/cards/rookie.png',
    frontAlt: 'Rookie card illustration — Jake Cohen at Turner Broadcasting',
    frontPlaceholderHue: 210,
    backTitle: 'Foundation Builder',
    backBody:
      "Media Ad Sales was the proving ground: fast calendars, lots of stakeholders, and campaigns that had to ship in the real world. I learned how approvals, measurement, and cross-functional execution actually work at scale-and built the muscle for crisp delivery under pressure.\n\nFor partners and brands:",
    stats: [
      { label: 'Partners & brands', value: "Google, Macy's, Apple & More" },
      { label: 'Execution', value: 'Enterprise campaign delivery' },
      { label: 'Focus', value: 'Media + integrated marketing' },
    ],
    flavor: 'Learned how big brands actually move.',
  },
  {
    id: 'rare',
    rarity: 'rare',
    tierLabel: 'Builder',
    company: 'Fama',
    role: 'First Marketing Hire',
    theme: 'Category Creator',
    frontImageSrc: '/cards/fama.png',
    frontAlt: 'Jake Cohen — Fama (Builder) era card',
    frontPlaceholderHue: 200,
    backTitle: 'Category Creator',
    backBody:
      'As the first marketer, I built the 0→1 foundation: positioning, narrative, site + demand programs, and sales enablement. I helped shape a clear category story—then turned it into repeatable campaigns and funnel instrumentation so growth wasn’t a one‑off launch.',
    stats: [
      { label: 'GTM revenue', value: '$0 → $1M+' },
      { label: 'Role', value: 'First marketing hire' },
      { label: 'Motion', value: 'Category + demand foundation' },
    ],
    specialTag: 'First Marketing Hire',
    flavor: '0 → 1 marketing in a new category.',
  },
  {
    id: 'epic',
    rarity: 'epic',
    tierLabel: 'Operator',
    company: 'Hopps',
    role: 'Growth & Product Marketing',
    theme: 'Startup Scaler',
    frontImageSrc: '/cards/hopps.png',
    frontAlt: 'Jake Cohen — Hopps (Operator) era card',
    frontPlaceholderHue: 280,
    backTitle: 'Startup Scaler',
    backBody:
      'At Hopps, I operated marketing through real scale: sharpen messaging as the product evolved, keep demand + lifecycle aligned with sales reality, and make metrics tell the truth to leadership and investors. The focus was turning traction into a repeatable growth engine.',
    stats: [
      { label: 'Year 1 growth', value: '21×' },
      { label: 'Funding supported', value: '$4M+' },
      { label: 'Operating mode', value: 'Lifecycle + GTM cadence' },
    ],
    specialTag: 'Product-Market Fit Unlock',
    flavor: 'Turned traction into a repeatable growth engine.',
  },
  {
    id: 'legendary',
    rarity: 'legendary',
    tierLabel: 'All Star',
    company: 'Cars Commerce',
    role: 'Product Marketing Lead',
    theme: 'System Builder',
    frontImageSrc: '/cards/legendary.png',
    frontAlt: 'Jake Cohen — Cars Commerce All Star card',
    frontPlaceholderHue: 195,
    backTitle: 'System Builder',
    backBody:
      'Built PMM from scratch: segmentation + messaging, launch rhythm, enablement, and customer proof. Partnered on retention/revenue levers (including churn root causes) and shipped AI-assisted workflows that reduced manual load and improved consistency.',
    stats: [
      { label: 'Preventable churn', value: '70%+ root-cause coverage' },
      { label: 'AI-led efficiency', value: '$1.3M+ / yr' },
      { label: 'Function build', value: 'PMM from zero' },
    ],
    flavor: 'Turns complexity into revenue.',
  },
  {
    id: 'bonus',
    rarity: 'bonus',
    tierLabel: 'Bonus',
    company: 'AI & Automation',
    role: 'Specialist',
    theme: 'Force Multiplier',
    frontImageSrc: '/cards/bonus.png',
    frontAlt: 'Jake Cohen — AI specialist bonus insert card',
    frontPlaceholderHue: 45,
    backTitle: 'AI Specialist',
    backBody:
      'I’m a hands-on builder: internal agents, lightweight tools, and workflow automation teams actually adopt. I ship AI-backed helpers across marketing, sales support, and ops—durable shortcuts that cut cycle time and raise quality.',
    stats: [
      { label: 'ChatGPT usage', value: 'Top 1% US (2025)' },
      { label: 'Hackathon', value: '2nd place (2025)' },
      { label: 'Build pattern', value: 'Agents + internal tools' },
    ],
    flavor: 'Shipping AI where work actually happens.',
  },
]
