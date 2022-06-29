import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { WeekScheduleList } from '../typings'

export const mainSelectedSeason = atom<string | null>({
  key: 'mainSelectedSeason',
  default: '',
})

export const mainSelectedDivision = atom<string | null>({
  key: 'mainSelectedDivision',
  default: '',
})

export const mainSelectedScheduleWeek = atom<WeekScheduleList | DocumentData>({
  key: 'mainSelectedScheduleWeek',
  default: {
    idName: '',
    date: '',
    weekName: '',
  },
})
