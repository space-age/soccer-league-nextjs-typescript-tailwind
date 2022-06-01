import { Team } from '../../../../typings'

interface Props {
  team: Team
  index: number
}

function SeasonTableRow({ team, index }: Props) {
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
      <td>{team.gf}</td>
      <td>{team.ga}</td>
      <td>{team.gd > 0 ? `+${team.gd}` : `${team.gd}`}</td>
      <td className="font-black">{team.points}</td>
    </tr>
  )
}

export default SeasonTableRow
