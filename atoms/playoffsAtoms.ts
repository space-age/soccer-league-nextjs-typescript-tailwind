import { atom } from 'recoil'

export const inputsDisablePlayoffs = atom<boolean>({
  key: 'inputsDisablePlayoffs',
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
