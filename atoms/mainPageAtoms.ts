import { atom } from 'recoil'

export const cancelGame = atom<boolean>({
  key: 'cancelGame',
  default: false,
})

export const messagedView = atom<boolean>({
  key: 'messagedView',
  default: false,
})
