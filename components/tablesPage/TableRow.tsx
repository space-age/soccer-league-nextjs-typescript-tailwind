import { Team } from '../../typings'

interface Props {
  team: Team
  index: number
}

function TableRow({ team, index }: Props) {
  return (
    <tr>
      <td>{++index}</td>
      <td className="!text-left text-[#263238] lg:!pr-32 lg:!pl-12">
        {team.name}
      </td>
      <td>{team.played}</td>
      <td>{team.won}</td>
      <td>{team.drawn}</td>
      <td>{team.lost}</td>
      <td className="hidden md:table-cell">{team.gf}</td>
      <td className="hidden md:table-cell">{team.ga}</td>
      <td>{team.gd > 0 ? `+${team.gd}` : `${team.gd}`}</td>
      <td className="font-black">{team.points}</td>
      <td>
        <div className=" flex flex-row justify-center gap-2">
          {team.form.map((result) => (
            <div
              className={`mainTable-Form ${
                result === 'l'
                  ? 'bg-[#f44336]'
                  : result === 'w'
                  ? 'bg-[#4caf50]'
                  : 'bg-[#616161] '
              }`}
            >
              {result}
            </div>
          ))}
        </div>
      </td>
    </tr>
  )
}

export default TableRow
