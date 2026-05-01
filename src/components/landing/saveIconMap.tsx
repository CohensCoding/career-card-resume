import type { ReactNode } from 'react'
import { BernieIcon, CardsIcon, EmptySlotIcon, NbaIcon, ResumeIcon, ToppsIcon } from './SaveIcons'

export type SaveIconId = 'cards' | 'nba' | 'topps' | 'bernie' | 'resume' | 'empty'

export function getSaveIcon(id: SaveIconId | string): ReactNode {
  switch (id) {
    case 'cards':
      return <CardsIcon />
    case 'nba':
      return <NbaIcon />
    case 'topps':
      return <ToppsIcon />
    case 'bernie':
      return <BernieIcon />
    case 'resume':
      return <ResumeIcon />
    case 'empty':
    default:
      return <EmptySlotIcon />
  }
}

