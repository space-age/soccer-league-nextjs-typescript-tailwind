import * as myConstants from '../../../../Tables/week1'
import SeasonTableRow from './SeasonTableRow'

function SeasonTable() {
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
          {myConstants.WEEK_2022_05_22.map((team, index) => (
            <SeasonTableRow team={team} key={team.name} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SeasonTable
