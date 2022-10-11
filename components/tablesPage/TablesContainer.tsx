import { useRecoilValue } from 'recoil'
import { selectedScheduleWeek } from '../../atoms/seasonAtoms'
import useTeamList from '../../hooks/useTeamList'
import TablesRow from './TablesRow'
import { v4 as uuidv4 } from 'uuid'

interface TempForm {
  date: string | null
  result: string | null
}

interface Calculations {
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
  form: {
    date: string | null
    result: string | null
  }[]
}

/**
 * Creates the table with the current season->division->schedule week chosen.
 * @returns table of selected season->division->schedule week
 */
function TablesContainer() {
  const teamList = useTeamList()
  const weekSchedule = useRecoilValue(selectedScheduleWeek) //current selected week schedule

  /*
    Loop thru team list and create a new array holding the table results
    for the gamesPlayed array
  */
  const tempTeamList = teamList.map((team) => {
    // const tempCounterGames = !team.gamesPlayed ? 0 : team.gamesPlayed.length
    const tempForm: TempForm[] | null = []
    const defaultCalculations: Calculations = {
      counterW: 0,
      counterPoints: 0,
      counterD: 0,
      counterL: 0,
      counterGoalsScored: 0,
      counterGoalsAgainst: 0,
      counterGoalsDifference: 0,
      gamesPlayed: false,
      name: team.idName,
      counterGames: 0,
      form: tempForm,
    }
    if (!team.gamesPlayed) return defaultCalculations
    else {
      team.gamesPlayed.map(
        (game: {
          result: string | null
          goalsScored: number | null
          goalsAgainst: number | null
          weekScheduleDate: string | null
        }) => {
          if (game.weekScheduleDate! <= weekSchedule.date) {
            if (game.result === 'W') {
              defaultCalculations.counterW += 1
              defaultCalculations.counterPoints += 3
            }
            if (game.result === 'D') {
              defaultCalculations.counterD += 1
              defaultCalculations.counterPoints += 1
            }
            if (game.result === 'L') {
              defaultCalculations.counterL += 1
            }

            defaultCalculations.counterGoalsScored += game.goalsScored!
            defaultCalculations.counterGoalsAgainst += game.goalsAgainst!
            defaultCalculations.gamesPlayed = true
            defaultCalculations.counterGames += 1

            tempForm.push({ date: game.weekScheduleDate, result: game.result })
          }
        }
      )
      //Sorts the array from highest date to lowestes date
      tempForm.sort(function (a, b) {
        return b.date! < a.date! ? -1 : 1
      })
      tempForm.splice(5) //removes all elements after position 5 because want to know the form for the last 5 games
      if (tempForm.length < 5) {
        const length = tempForm.length
        for (let i = 0; i < 5 - length; i++) {
          tempForm.push({ date: '', result: '' })
        }
      }

      defaultCalculations.form = tempForm

      defaultCalculations.counterGoalsDifference =
        defaultCalculations.counterGoalsScored -
        defaultCalculations.counterGoalsAgainst

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

  const check =
    !weekSchedule?.idName ||
    weekSchedule?.idName.length === 0 ||
    weekSchedule === undefined
      ? true
      : false

  return (
    <div
      className={`${
        !check && 'shadow-xl'
      } my-5 overflow-auto rounded-sm border-2 text-black  md:m-5 lg:m-7`}
    >
      {check && (
        <div>
          <h2 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
            Select a season, division, and week schedule to view table
          </h2>
        </div>
      )}
      {!check && (
        <table className="mainTable sticky">
          <thead>
            <tr className="bg-[#006064] text-white">
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

              <th className="hidden md:table-cell">Form (Current--Previous)</th>
              <th className="md:hidden">Form</th>
            </tr>
          </thead>
          <tbody>
            {tempTeamList.map((team, index) => (
              <TablesRow team={team} key={uuidv4()} index={index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TablesContainer
