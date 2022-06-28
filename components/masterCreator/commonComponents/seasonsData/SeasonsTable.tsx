import useTeamList from '../../../../hooks/useTeamList'
import * as myConstants from '../../../../Tables/week1'
import SeasonTableRow from './SeasonTableRow'

interface Props {
  division: string
}
function SeasonTable({ division }: Props) {
  const teamList = useTeamList(division)

  /*
    Loop thru team list and create a new array holding the table results
    for the gamesPlayed array
  */
  const tempTeamList = teamList.map((team) => {
    const tempCounterGames = !team.gamesPlayed ? 0 : team.gamesPlayed.length
    const defaultCalculations = {
      counterW: 0,
      counterPoints: 0,
      counterD: 0,
      counterL: 0,
      counterGoalsScored: 0,
      counterGoalsAgainst: 0,
      counterGoalsDifference: 0,
      gamesPlayed: false,
      name: team.idName,
      counterGames: tempCounterGames,
    }
    if (!team.gamesPlayed) return defaultCalculations
    else {
      team.gamesPlayed.map(
        (game: {
          result: string | null
          goalsScored: number | null
          goalsAgainst: number | null
        }) => {
          if (game.result === 'W') {
            defaultCalculations.counterW += 1
            defaultCalculations.counterPoints += 3
          }
          if (game.result === 'D') {
            defaultCalculations.counterD += 1
            defaultCalculations.counterPoints += 1
          }
          if (game.result === 'D') {
            defaultCalculations.counterL += 1
          }

          defaultCalculations.counterGoalsScored += game.goalsScored!
          defaultCalculations.counterGoalsAgainst += game.goalsAgainst!
        }
      )
      defaultCalculations.counterGoalsDifference =
        defaultCalculations.counterGoalsScored -
        defaultCalculations.counterGoalsAgainst

      defaultCalculations.gamesPlayed = true

      return defaultCalculations
    }
  })

  // Sorts the schedule list by points first then by goals difference, in greatest to lowest
  tempTeamList.sort((a, b) => {
    if (a.counterPoints === b.counterPoints) {
      return a.counterGoalsDifference > b.counterGoalsDifference ? -1 : 1
    } else {
      return a.counterPoints > b.counterPoints ? -1 : 1
    }
  })

  return (
    <div className="my-5 overflow-auto rounded-sm border-2 text-black shadow-xl md:m-5 lg:m-7">
      <table className="mainTable sticky">
        <thead>
          <tr>
            <th className="hidden lg:table-cell">Position</th>
            <th className="lg:hidden"></th>

            <th className="text-left lg:pr-32 lg:pl-12">Team</th>

            <th className="hidden lg:table-cell">Played</th>
            <th className="lg:hidden">Pl</th>

            <th className="hidden lg:table-cell">Won</th>
            <th className="lg:hidden">W</th>

            <th className="hidden lg:table-cell">Drawn</th>
            <th className="lg:hidden">D</th>

            <th className="hidden lg:table-cell">Lost</th>
            <th className="lg:hidden">L</th>

            <th>GF</th>
            <th>GA</th>
            <th>GD</th>

            <th className="hidden md:table-cell">Points</th>
            <th className="md:hidden">Pts</th>
          </tr>
        </thead>
        <tbody>
          {tempTeamList.map((team, index) => (
            <SeasonTableRow team={team} key={team.name} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SeasonTable
