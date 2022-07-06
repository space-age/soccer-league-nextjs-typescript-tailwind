import { atom } from 'recoil'

export const inputsDisablePlayoffs = atom<boolean>({
  key: 'inputsDisablePlayoffs',
  default: false,
})
export const showCreateRoundForm = atom<boolean>({
  key: 'showCreateRoundForm',
  default: false,
})

export const showDeleteBracketModal = atom<boolean>({
  key: 'showDeleteBracketModal',
  default: false,
})

export const showPublishBracketModal = atom<boolean>({
  key: 'showPublishBracketModal',
  default: false,
})
