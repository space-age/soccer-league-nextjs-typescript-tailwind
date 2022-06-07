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
