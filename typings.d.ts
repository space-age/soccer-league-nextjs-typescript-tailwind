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

export interface TeamData {
  name: string
  gamesPlayed: string[]
  goalsScored: number[]
  goalsAgainst: number[]
  teamAgainst: string[]
}
