import { atom } from 'recoil'
import { AddedSeason } from '../typings'

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
})

export const submissionData = atom<AddedSeason | null>({
  key: 'submissionData',
  default: null,
})

export const modalStateRemoveSeason = atom<boolean>({
  key: 'modalStateRemoveSeason',
  default: false,
})

export const modalStateRemoveTeam = atom<boolean>({
  key: 'modalStateRemoveTeam',
  default: false,
})
