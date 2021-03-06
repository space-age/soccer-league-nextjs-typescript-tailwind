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
  weekName: string
  pushed: boolean
}

export interface PlayoffsBracket {
  idName: string
  date: string
  bracketName: string
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
  fieldNumbers: number[]
}

export interface Assignments {
  currentDivision: string
  currentSeason: string
  currentWeekSchedule: {
    date: string
    idName: string
    weekName: string
    pushed: boolean
  }
  currentPlayoffBracket: {
    date: string
    idName: string
    bracketName: string
    pushed: boolean
  }
  currentPlayoffDivision: string
  currentPlayoffSeason: string
}

export interface GameCancel {
  active: boolean | string
  date: string
}
interface Playoff {
  time: string
  fieldNumber: number | null
  teamA: string
  teamB: string
  scoredA: number | null | string
  scoredB: number | null | string
  date: string
}
export interface PlayoffGame {
  match1Game1: Playoff
  match1Game2: Playoff
  match2Game1: Playoff
  match2Game2: Playoff
  match3Game1: Playoff
  match3Game2: Playoff
  match4Game1: Playoff
  match4Game2: Playoff
  final: Playoff
}
