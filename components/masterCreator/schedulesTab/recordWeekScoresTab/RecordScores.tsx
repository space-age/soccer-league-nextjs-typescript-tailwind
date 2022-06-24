import { deleteDoc, doc, DocumentData } from 'firebase/firestore'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { ScheduleList } from '../../../../typings'
import Schedule from '../addScheduleTab/Schedule'
import RecordScoresForm from './RecordScoresForm'

interface Props {
  list: ScheduleList | DocumentData
}

function RecordScores({ list }: Props) {
  const [editMode, setEditMode] = useState(false)

  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {!editMode && <Schedule list={list} />}
      <div className="flex justify-center gap-10">
        {!editMode && (
          <button
            onClick={handleEditClick}
            className=" w-[15%]  justify-center rounded bg-[#00838f] text-base font-semibold  uppercase tracking-wider text-white hover:bg-[#006064]"
          >
            edit scores
          </button>
        )}
      </div>
      {editMode && (
        <RecordScoresForm list={list} handleEditClick={handleEditClick} />
      )}
    </div>
  )
}

export default RecordScores
