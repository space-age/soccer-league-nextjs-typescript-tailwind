import { atom } from 'recoil'

export const inputsDisable = atom<boolean>({
  key: 'inputsDisable',
  default: false,
})
export const showCreateRoundForm = atom<boolean>({
  key: 'showCreateRoundForm',
  default: false,
})

// export const showAddWeekScheduleForm = atom<boolean>({
//   key: 'showAddWeekScheduleForm',
//   default: false,
// })

// export const showListOfSchedules = atom<boolean>({
//   key: 'showListOfSchedules',
//   default: false,
// })
