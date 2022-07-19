import { v4 as uuidv4 } from 'uuid'

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
    form: {
      date: string | null
      result: string | null
    }[]
  }
  index: number
}

function TablesRow({ team, index }: Props) {
  const currentForm = () => {
    if (team.form.length === 0 || !team.form) {
      const numRows = 5
      const tempArray = []
      for (var i = 0; i < numRows; i++) {
        tempArray.push(
          <div key={uuidv4()} className="mainTable-Form bg-[#616161]"></div>
        )
      }
      return <>{tempArray}</>
    }

    const form = team.form.map((form, index) => (
      <div
        key={uuidv4()}
        className={`mainTable-Form ${
          form.result === 'L'
            ? 'bg-[#f44336]'
            : form.result === 'W'
            ? 'bg-[#4caf50]'
            : 'bg-[#616161] '
        }`}
      >
        {form.result}
      </div>
    ))
    return form
  }

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
      <td>
        <div className=" flex flex-row justify-center gap-2">
          {currentForm()}
        </div>
      </td>
    </tr>
  )
}

export default TablesRow
