import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  selectedPlayoffBracket,
  selectedScheduleWeek,
} from '../../../../atoms/seasonAtoms'
import useSchedulesList from '../../../../hooks/useSchedulesList'
import { ScheduleList } from '../../../../typings'

function AddPlayoffsGamesContainer() {
  const selectedBracket = useRecoilValue(selectedPlayoffBracket)
  const [editMode, setEditMode] = useState(false)

  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div className="my-5 rounded-sm border-2  border-[#ccc] bg-[#eeeeee] p-3">
      <div className="flex justify-center  gap-5">
        <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
          Playoff Bracket Name:{' '}
          <span className="text-[#006064]">{selectedBracket.bracketName}</span>
        </h1>
        <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
          Start Date:{' '}
          <span className="text-[#006064]">{selectedBracket.date}</span>
        </h1>
      </div>

      <p className="schedule--label">Quarter-Finals</p>
      {/*Match 1*/}
      <p className="playoffs--match">Match 1</p>
      {/* Game 1 for Match 1 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 1 */}
      <p className="playoffs--game">Game 2</p>

      {/*Match 2*/}
      <p className="playoffs--match">Match 2</p>
      {/* Game 1 for Match 2 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 3 */}
      <p className="playoffs--game">Game 2</p>

      {/*Match 3*/}
      <p className="playoffs--match">Match 3</p>
      {/* Game 1 for Match 3 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 3 */}
      <p className="playoffs--game">Game 2</p>

      {/*Match 4*/}
      <p className="playoffs--match">Match 4</p>
      {/* Game 1 for Match 4 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 4 */}
      <p className="playoffs--game">Game 2</p>

      <p className="schedule--label">Semi-Finals</p>

      {/*Match 1*/}
      <p className="playoffs--match">Match 1</p>
      {/* Game 1 for Match 1 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 1 */}
      <p className="playoffs--game">Game 2</p>

      {/*Match 2*/}
      <p className="playoffs--match">Match 2</p>
      {/* Game 1 for Match 2 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 3 */}
      <p className="playoffs--game">Game 2</p>

      <p className="schedule--label">Final</p>
      {/* Final Match */}
      <p className="playoffs--match">Final Match</p>
    </div>
  )
}

export default AddPlayoffsGamesContainer
