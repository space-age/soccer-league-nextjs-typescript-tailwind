import MuiModal from '@mui/material/Modal'

import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { modalStateRemoveTeam } from '../../../../atoms/seasonModalAtoms'

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../../../../firebase'
import useTeamList from '../../../../hooks/useTeamList'

function ShowDeleteWeekScheduleModal() {
  const [showModal, setShowModal] = useRecoilState(modalStateRemoveTeam)
  // const [schedule, setSchedule] = useRecoilState(selectedScheduleWeek)

  const weekSchedule = useRecoilValue(selectedScheduleWeek)
  const seasonsData = useRecoilValue(selectedSeason)
  const divisionData = useRecoilValue(selectedDivision)

  const resetWeekSchedule = useResetRecoilState(selectedScheduleWeek)
  const resetDivision = useResetRecoilState(selectedDivision)
  const resetSeason = useResetRecoilState(selectedSeason)

  const [deleteComplete, setDeleteComplete] = useState(false)

  const handleClose = () => {
    setShowModal(false)
    setDeleteComplete(false)
  }

  const teamList = useTeamList()

  const removeWeekScheduleFromTeams = async () => {
    teamList.map(async (team) => {
      if (!team.gamesPlayed) return
      const listRef = doc(
        db,
        'Seasons',
        seasonsData!,
        'Divisions',
        divisionData!,
        'Teams',
        team.idName!
      )

      const tempList = team.gamesPlayed.filter(function (game: {
        weekScheduleID: string
      }) {
        return game.weekScheduleID !== weekSchedule.idName
      })

      // Remove gamesPlayed array field from the document
      await updateDoc(listRef, {
        gamesPlayed: deleteField(),
      })
      if (tempList.length > 0) {
        // Add the new modify list to the gamesPlayed array
        await updateDoc(listRef, {
          gamesPlayed: tempList,
        })
      }
    })
  }

  const handleDeleteSeason = async () => {
    await removeWeekScheduleFromTeams()
    await deleteDoc(
      doc(
        db,
        'Seasons',
        seasonsData!,
        'Divisions',
        divisionData!,
        'Weeks-Schedules',
        weekSchedule.idName
      )
    )
    // setSchedule('')
    resetWeekSchedule()
    resetDivision()
    resetSeason()
    setDeleteComplete(true)
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className={`${
        deleteComplete ? 'bg-[#f44336]' : 'bg-[#64b5f6]'
      } mx-auto my-auto h-[45%] w-[33%] border-2 border-black p-4`}
    >
      <div className="text-xl font-semibold text-white">
        {!deleteComplete && (
          <>
            <h2>The following week schedule will be deleted permanently.</h2>
            <h3 className="mt-2 pl-3 font-bold text-[#ff922b]">
              This is your final warning. Once deleted, cannot be undone!
            </h3>
            <p className="mt-7">Week Schedule to delete: </p>
            <div className="ml-3 capitalize text-[#ff922b]">
              <p>
                <span className="text-[#ccc]">Week Schedule Name: </span>
                {weekSchedule.weekName}
              </p>
              <p>
                <span className="text-[#ccc]">Week Schedule Date: </span>
                {weekSchedule.date}
              </p>
            </div>

            <button
              onClick={handleDeleteSeason}
              className="text-bold mt-6 rounded border-2 border-black bg-red-500 p-1 hover:bg-red-300 hover:text-black"
            >
              Delete Week Schedule
            </button>
          </>
        )}
        {deleteComplete && (
          <>
            <h2 className="text-2xl font-bold">Deletion has been completed!</h2>
          </>
        )}
      </div>
    </MuiModal>
  )
}

export default ShowDeleteWeekScheduleModal
