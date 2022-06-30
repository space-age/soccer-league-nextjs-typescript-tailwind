/*
  Component that does the calculations for the table row inside the component, instead of passing in the data as props
*/

import React from 'react'

function SeasonTableRowCopy() {
  return <div>-</div>
}

export default SeasonTableRowCopy

// import { DocumentData } from 'firebase/firestore'
// import { Team, TeamList } from '../../../../typings'

// interface Props {
//   team: TeamList | DocumentData
//   index: number
// }

// function SeasonTableRow({ team, index }: Props) {
//   const calculations = () => {
//     const defaultCalculations = {
//       counterW: 0,
//       counterPoints: 0,
//       counterD: 0,
//       counterL: 0,
//       counterGoalsScored: 0,
//       counterGoalsAgainst: 0,
//       counterGoalsDifference: 0,
//     }
//     if (!team.gamesPlayed) return defaultCalculations
//     else {
//       team.gamesPlayed.map((game) => {
//         if (game.result === 'W') {
//           defaultCalculations.counterW += 1
//           defaultCalculations.counterPoints += 3
//         }
//         if (game.result === 'D') {
//           defaultCalculations.counterD += 1
//           defaultCalculations.counterPoints += 1
//         }
//         if (game.result === 'D') {
//           defaultCalculations.counterL += 1
//         }

//         defaultCalculations.counterGoalsScored += game.goalsScored
//         defaultCalculations.counterGoalsAgainst += game.goalsAgainst
//       })
//       defaultCalculations.counterGoalsDifference =
//         defaultCalculations.counterGoalsScored -
//         defaultCalculations.counterGoalsAgainst
//       return defaultCalculations
//     }
//   }

//   const teamCalc = calculations()

//   return (
//     <tr>
//       <td>{++index}</td>
//       <td className="!text-left text-[#263238] lg:!pr-32 lg:!pl-12">
//         {team.name}
//       </td>
//       <td>{!team.gamesPlayed ? 0 : team.gamesPlayed.length}</td>
//       <td>{teamCalc.counterW}</td>
//       <td>{teamCalc.counterD}</td>
//       <td>{teamCalc.counterL}</td>
//       <td>{teamCalc.counterGoalsScored}</td>
//       <td>{teamCalc.counterGoalsAgainst}</td>
//       <td>
//         {teamCalc.counterGoalsDifference > 0
//           ? `+${teamCalc.counterGoalsDifference}`
//           : `${teamCalc.counterGoalsDifference}`}
//       </td>
//       <td className="font-black">{teamCalc.counterPoints}</td>
//     </tr>
//   )
// }

// export default SeasonTableRow
