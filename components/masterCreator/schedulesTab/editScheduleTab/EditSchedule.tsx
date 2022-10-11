import { deleteDoc, doc, DocumentData } from 'firebase/firestore'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { db } from '../../../../firebase'
import { ScheduleList } from '../../../../typings'
import Schedule from '../addScheduleTab/Schedule'
import EditScheduleForm from './EditScheduleForm'

interface Props {
  list: ScheduleList | DocumentData
}

/**
 * Displays the schedule, with the option to edit or remove the schedule
 * @param list
 * @returns
 */
function EditSchedule({ list }: Props) {
  const [editMode, setEditMode] = useState(false)
  const seasonsData = useRecoilValue(selectedSeason)
  const divisionData = useRecoilValue(selectedDivision)
  const weekScheduleData = useRecoilValue(selectedScheduleWeek)

  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  const handleRemoveClick = async () => {
    await deleteDoc(
      doc(
        db,
        'Seasons',
        seasonsData!,
        'Divisions',
        divisionData!,
        'Weeks-Schedules',
        weekScheduleData.idName,
        'Schedules',
        list.idName!
      )
    )
  }

  return (
    <div>
      {!editMode && <Schedule list={list} />}
      <div
        className={`${
          list.scoredA === null && list.scoredB === null && '!flex'
        } hidden  justify-center gap-10`}
      >
        {!editMode && (
          <button
            onClick={handleEditClick}
            className=" w-[15%]  justify-center rounded bg-[#00838f] text-base font-semibold  uppercase tracking-wider text-white hover:bg-[#006064]"
          >
            edit
          </button>
        )}
        {!editMode && (
          <button
            onClick={handleRemoveClick}
            className="w-[15%]  justify-center rounded bg-[#b71c1c] text-base font-semibold  uppercase tracking-wider text-white hover:bg-[#f44336]"
          >
            Remove
          </button>
        )}
      </div>
      {editMode && (
        <EditScheduleForm list={list} handleEditClick={handleEditClick} />
      )}
    </div>
  )
}

export default EditSchedule
