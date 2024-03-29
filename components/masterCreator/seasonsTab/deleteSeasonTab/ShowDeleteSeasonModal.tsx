import MuiModal from '@mui/material/Modal'

import { selectedSeason } from '../../../../atoms/seasonAtoms'
import { modalStateRemoveSeason } from '../../../../atoms/seasonModalAtoms'

import { useRecoilState, useRecoilValue } from 'recoil'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { useState } from 'react'
import useAssignments from '../../../../hooks/useAssignments'

/**
 * Material UI Modal to display a final warming that the selected season will be deleted permenantly from database
 */
function ShowDeleteSeasonModal() {
  const [showModal, setShowModal] = useRecoilState(modalStateRemoveSeason)
  const [season, setSeason] = useRecoilState(selectedSeason)
  const data = useRecoilValue(selectedSeason)

  const [deleteComplete, setDeleteComplete] = useState(false)

  const assignments = useAssignments()

  const handleClose = () => {
    setShowModal(false)
    setDeleteComplete(false)
  }

  /**
   * Handler to delete the document, the selected season from data
   */
  const handleDeleteSeason = async () => {
    await deleteDoc(doc(db, 'Seasons', data!))
    // If the current season deleted is the current season assigned, then reset the values of the assignments back to blank
    if (data === assignments?.currentSeason) {
      const listRef = doc(db, 'More', 'Assignments')
      await updateDoc(listRef, {
        currentSeason: '',
        currentWeekSchedule: {
          date: '',
          idName: '',
          pushed: false,
          weekName: '',
        },
      })
    }

    setSeason('') //resets the selected season
    setDeleteComplete(true) //will display the message that deletion has been completed
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className={`${
        deleteComplete ? 'bg-[#f44336]' : 'bg-[#64b5f6]'
      } mx-auto my-auto h-[38%] w-[33%] border-2 border-black p-4`}
    >
      <div className="text-xl font-semibold text-white">
        {!deleteComplete && (
          <>
            <h2>The following season will be deleted permanently.</h2>
            <h3 className="mt-2 pl-3 font-bold text-[#ff922b]">
              This is your final warning. Once deleted, cannot be undone!
            </h3>
            <p className="mt-7">
              Season to delete:{' '}
              <span className="capitalize text-[#ff922b]">{data}</span>
            </p>

            <button
              onClick={handleDeleteSeason}
              className="text-bold mt-6 rounded border-2 border-black bg-red-500 p-1 hover:bg-red-300 hover:text-black"
            >
              Delete Season
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

export default ShowDeleteSeasonModal
