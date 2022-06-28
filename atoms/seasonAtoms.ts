import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { AddedSeason, WeekScheduleList } from '../typings'

// export const modalStateRemoveSeason = atom<boolean>({
//   key: 'modalStateRemoveSeason',
//   default: false,
// })

export const selectedSeason = atom<string | null>({
  key: 'selectedSeason',
  default: '',
})

export const selectedDivision = atom<string | null>({
  key: 'selectedDivision',
  default: '',
})

export const selectedTeam = atom<string | null>({
  key: 'selectedTeam',
  default: '',
})

// export const selectedScheduleWeek = atom<string | null>({
//   key: 'selectedScheduleWeek',
//   default: '',
// })

export const selectedScheduleWeek = atom<WeekScheduleList | DocumentData>({
  key: 'selectedScheduleWeek',
  default: {
    idName: '',
    date: '',
    weekName: '',
  },
})
