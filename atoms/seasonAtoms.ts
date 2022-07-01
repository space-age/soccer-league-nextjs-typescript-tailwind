import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { AddedSeason, PlayoffsBracket, WeekScheduleList } from '../typings'

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

export const selectedScheduleWeek = atom<WeekScheduleList | DocumentData>({
  key: 'selectedScheduleWeek',
  default: {
    idName: '',
    date: '',
    weekName: '',
  },
})

export const selectedPlayoffBracket = atom<PlayoffsBracket | DocumentData>({
  key: 'selectedPlayoffBracket',
  default: {
    idName: '',
    date: '',
    bracketName: '',
  },
})
