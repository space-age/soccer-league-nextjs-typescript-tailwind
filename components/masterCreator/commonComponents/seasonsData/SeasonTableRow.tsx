import { DocumentData } from 'firebase/firestore'
import { Team, TeamList } from '../../../../typings'

interface Props {
  team: {
    counterW: number
    counterPoints: number
    counterD: number
    counterL: number
    counterGoalsScored: number
    counterGoalsAgainst: number
    counterGoalsDifference: number
    gamesPlayed: boolean
    name: string
    counterGames: number
  }
  index: number
}

function SeasonTableRow({ team, index }: Props) {
  return (
    <tr>
      <td>{++index}</td>
      <td className="!text-left text-[#263238] lg:!pr-32 lg:!pl-12">
        {team.name}
      </td>
      <td>{!team.gamesPlayed ? 0 : team.counterGames}</td>
      <td>{team.counterW}</td>
      <td>{team.counterD}</td>
      <td>{team.counterL}</td>
      <td>{team.counterGoalsScored}</td>
      <td>{team.counterGoalsAgainst}</td>
      <td>
        {team.counterGoalsDifference > 0
          ? `+${team.counterGoalsDifference}`
          : `${team.counterGoalsDifference}`}
      </td>
      <td className="font-black">{team.counterPoints}</td>
    </tr>
  )
}

export default SeasonTableRow
