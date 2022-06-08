import { atom } from 'recoil'
import { AddedSeason } from '../typings'

export const modalStateRemoveSeason = atom<boolean>({
  key: 'modalStateRemoveSeason',
  default: false,
})

export const selectedSeason = atom<string | null>({
  key: 'selectedSeason',
  default: '',
})
