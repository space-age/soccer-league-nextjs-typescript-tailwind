import { atom } from 'recoil'

export const inputsDisable = atom<boolean>({
  key: 'inputsDisable',
  default: false,
})
export const showAddScheduleForm = atom<boolean>({
  key: 'showAddScheduleForm',
  default: false,
})

export const showAddWeekScheduleForm = atom<boolean>({
  key: 'showAddWeekScheduleForm',
  default: false,
})
