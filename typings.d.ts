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
