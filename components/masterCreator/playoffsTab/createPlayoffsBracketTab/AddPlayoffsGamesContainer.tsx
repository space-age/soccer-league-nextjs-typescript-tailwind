import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  selectedPlayoffBracket,
  selectedScheduleWeek,
} from '../../../../atoms/seasonAtoms'
import usePlayoffBracket from '../../../../hooks/usePlayoffBracket'
import useQuarterFinals from '../../../../hooks/useQuarterFinals'
import useSchedulesList from '../../../../hooks/useSchedulesList'
import { ScheduleList } from '../../../../typings'
import PlayoffBracketContainer from './PlayoffBracketContainer'

function AddPlayoffsGamesContainer() {
  const selectedBracket = useRecoilValue(selectedPlayoffBracket)
  const [editMode, setEditMode] = useState(false)

  const quarterFinalsBracket = usePlayoffBracket('QuarterFinals')
  const semiFinalsBracket = usePlayoffBracket('SemiFinals')
  const finalsBracket = usePlayoffBracket('Finals')

  console.log(quarterFinalsBracket)
  console.log(finalsBracket)
  // const handleEditClick = () => {
  //   setEditMode(!editMode)
  // }

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
      <PlayoffBracketContainer />
    </div>
  )
}

export default AddPlayoffsGamesContainer
