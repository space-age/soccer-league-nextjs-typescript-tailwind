export interface Team {
  position: number
  name: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
  gd: number
  points: number
  form: string[]
}

export interface Schedule {
  field: string
  teamA: string
  teamB: string
  scoreA: string
  scoreB: string
  time: string
}

export interface Field {
  id: number
  fields: number[]
  address: string
}

export interface AddedSeason {
  seasonName: string
  divisionsName: { name: string }[]
}

export interface AddedTeam {
  teams: { name: string }[]
}
export interface AddedSchedule {
  scheduleList: {
    time: string
    fieldNumber: number | null
    teamA: string
    teamB: string
  }[]
}

export interface TeamData {
  name: string
  gamesPlayed: string[]
  goalsScored: number[]
  goalsAgainst: number[]
  teamAgainst: string[]
}

// export interface TeamList {
//   idName: string
//   name: string
//   gamesPlayed: string[]
//   goalsScored: number[]
//   goalsAgainst: number[]
//   teamAgainst: string[]
// }
export interface TeamList {
  idName: string
  name: string
  gamesPlayed: {
    // weekName: string | null
    result: string | null
    goalsScored: number | null
    goalsAgainst: number | null
    teamAgainst: string | null
    weekScheduleDate: string | null
    weekScheduleName: string | null
    weekScheduleID: string | null
    scheduleID: string | null
  }[]
}

export interface WeekScheduleList {
  idName: string
  date: string
  // weekName: number
  weekName: string
  pushed: boolean
}

export interface ScheduleList {
  idName: string
  time: string | null
  fieldNumber: number | null
  teamA: string | null
  teamB: string | null
  scoredA: number | null
  scoredB: number | null
}

export interface FieldsList {
  address: string
  fieldNumber: number
}

export interface Assignments {
  currentDivision: string
  currentSeason: string
  currentWeekSchedule: {
    date: string
    idName: string
    weekName: string
  }
}
