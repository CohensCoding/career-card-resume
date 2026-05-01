export type ProjectAction =
  | { kind: 'route'; to: string }
  | { kind: 'external'; href: string }
  | { kind: 'pdf'; href: string }
  | { kind: 'soon' }

export type Project = {
  id: string
  name: string
  filename: string
  tags: string[]
  description: string
  meta: { TYPE: string; STATUS: string; BLOCKS: string }
  action: ProjectAction
}

export const PROJECTS: Project[] = [
  {
    id: 'cards',
    name: 'Career Card Pack',
    filename: 'pack_of_cards.sav',
    tags: ['Portfolio', 'Web App', '2024'],
    description:
      'An interactive resume reimagined as a trading card pack. Visitors rip a pack of "candidate cards" instead of scrolling a CV. The original concept that started cohen.marketing — now living on as one of many save files.',
    meta: { TYPE: 'Web Experience', STATUS: 'Live', BLOCKS: '2 / 9' },
    action: { kind: 'route', to: '/cards' },
  },
  {
    id: 'nba',
    name: 'NBA Sliders',
    filename: 'nba_sliders.sav',
    tags: ['Widget', 'Sports', 'Interactive'],
    description:
      'A stats slider toy built on 50 years of NBA data. Move PPG/RPG/APG/steals/blocks and it instantly finds the closest historical player-season match—surprising comps included.',
    meta: { TYPE: 'Widget', STATUS: 'Live', BLOCKS: '1 / 9' },
    action: { kind: 'external', href: 'https://nba-sliders.vercel.app/' },
  },
  {
    id: 'topps',
    name: '2025 Topps Breakdown',
    filename: 'topps_2025.sav',
    tags: ['Analysis', 'Trading Cards', 'MLB'],
    description:
      'An analytical, data-viz breakdown of the 2025 Topps Football release — explore the set by team, player, and card attributes to spot patterns (and value) quickly.',
    meta: { TYPE: 'Report', STATUS: 'Published', BLOCKS: '3 / 9' },
    action: { kind: 'external', href: 'https://2025topps.com' },
  },
  {
    id: 'bernie',
    name: 'Bernie',
    filename: 'bernie.sav',
    tags: ['App', 'Portfolio Tracker', 'Trading Cards'],
    description:
      'A portfolio tracker for trading cards — log purchases, watch comps, and see your card portfolio behave like a real asset book. Named Bernie because every collection deserves an accountant who actually shows up.',
    meta: { TYPE: 'Web App', STATUS: 'In Development', BLOCKS: '2 / 9' },
    action: { kind: 'soon' },
  },
  {
    id: 'resume',
    name: 'Standard Resume',
    filename: 'jake-cohen-resume-2026.pdf',
    tags: ['PDF', 'Classic'],
    description:
      'For recruiters who would rather read a one-pager than rip a card pack. Same information, less ceremony.',
    meta: { TYPE: 'Document', STATUS: 'Current', BLOCKS: '1 / 9' },
    action: { kind: 'pdf', href: '/jake-cohen-resume-2026.pdf' },
  },
]

