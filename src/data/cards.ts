export type Rarity = 'rookie' | 'rare' | 'epic' | 'legendary' | 'bonus'

export type CareerStat = { label: string; value: string }

export type CareerCardData = {
  id: string
  rarity: Rarity
  /** Collectible tier label on front ribbon */
  tierLabel: string
  company: string
  role: string
  theme: string
  frontImageSrc: string | null
  frontAlt: string
  /** When no custom art yet */
  frontPlaceholderHue: number
  backTitle: string
  backBody: string
  stats: CareerStat[]
  flavor?: string
  specialTag?: string
}

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
      'Early career in enterprise media: learned how big brands plan, ship, and measure campaigns alongside major partners.',
    stats: [
      { label: 'Enterprise exposure', value: 'Google, Macy’s' },
      { label: 'Focus', value: 'Campaign execution at scale' },
    ],
    flavor: 'Learned how big brands actually move.',
  },
  {
    id: 'rare',
    rarity: 'rare',
    tierLabel: 'All-Star',
    company: 'Fama',
    role: 'First Marketing Hire',
    theme: 'Category Creator',
    frontImageSrc: '/cards/fama.png',
    frontAlt: 'Jake Cohen product marketing pitch — Fama era card',
    frontPlaceholderHue: 200,
    backTitle: 'Category Creator',
    backBody:
      'Built GTM from zero and helped define a new category narrative around AI-powered hiring and trust.',
    stats: [
      { label: 'GTM built', value: '$0 → $1M+' },
      { label: 'Category', value: 'AI hiring' },
    ],
    specialTag: 'First Marketing Hire',
    flavor: '0 → 1 marketing in a new category.',
  },
  {
    id: 'epic',
    rarity: 'epic',
    tierLabel: 'All-Star',
    company: 'Hopps',
    role: 'Growth & Product Marketing',
    theme: 'Startup Scaler',
    frontImageSrc: '/cards/hopps.png',
    frontAlt: 'Jake Cohen — Hopps era All-Star card',
    frontPlaceholderHue: 280,
    backTitle: 'Startup Scaler',
    backBody:
      'Operational marketing through rapid scale: demand gen, narrative, and fundraising momentum.',
    stats: [
      { label: 'Year 1 growth', value: '21×' },
      { label: 'Funding supported', value: '$4M+' },
    ],
    specialTag: 'Product-Market Fit Unlock',
    flavor: 'Turned traction into a repeatable growth engine.',
  },
  {
    id: 'legendary',
    rarity: 'legendary',
    tierLabel: 'Hall of Fame',
    company: 'Cars Commerce',
    role: 'Product Marketing Lead',
    theme: 'System Builder',
    frontImageSrc: '/cards/legendary.png',
    frontAlt: 'Jake Cohen — Cars Commerce Hall of Fame legendary card',
    frontPlaceholderHue: 195,
    backTitle: 'System Builder',
    backBody:
      'Built PMM from scratch and shipped AI-led systems that tied directly to revenue retention and efficiency.',
    stats: [
      { label: 'Preventable churn', value: '70%+ addressed' },
      { label: 'AI efficiency', value: '$1.3M+ / yr' },
      { label: 'Function', value: 'PMM from scratch' },
    ],
    flavor: 'Turns complexity into revenue.',
  },
  {
    id: 'bonus',
    rarity: 'bonus',
    tierLabel: 'Insert',
    company: 'AI & Automation',
    role: 'Specialist',
    theme: 'Force Multiplier',
    frontImageSrc: '/cards/bonus.png',
    frontAlt: 'Jake Cohen — AI specialist bonus insert card',
    frontPlaceholderHue: 45,
    backTitle: 'AI Specialist',
    backBody:
      'Hands-on builder: agents, internal tools, and applied AI workflows across teams — not slides, systems.',
    stats: [
      { label: 'ChatGPT usage', value: 'Top 1% US (2025)' },
      { label: 'Hackathon', value: '2nd place (2025)' },
      { label: 'Builds', value: 'Agents & AI tools' },
    ],
    flavor: 'Shipping AI where work actually happens.',
  },
]
