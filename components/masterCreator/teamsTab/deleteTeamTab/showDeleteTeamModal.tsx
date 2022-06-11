import MuiModal from '@mui/material/Modal'

import {
  selectedDivision,
  selectedSeason,
  selectedTeam,
} from '../../../../atoms/seasonAtoms'
import { modalStateRemoveTeam } from '../../../../atoms/seasonModalAtoms'

import { useRecoilState, useRecoilValue } from 'recoil'
import { deleteDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../../../../firebase'

function ShowDeleteTeamModal() {
  const [showModal, setShowModal] = useRecoilState(modalStateRemoveTeam)
  const [team, setTeam] = useRecoilState(selectedTeam)
  const [division, setDivision] = useRecoilState(selectedDivision)
  const [season, setSeason] = useRecoilState(selectedSeason)

  const teamData = useRecoilValue(selectedTeam)
  const seasonsData = useRecoilValue(selectedSeason)
  const divisionData = useRecoilValue(selectedDivision)

  const [deleteComplete, setDeleteComplete] = useState(false)

  const handleClose = () => {
    setShowModal(false)
    setDeleteComplete(false)
  }

  const handleDeleteSeason = async () => {
    await deleteDoc(
      doc(
        db,
        'Seasons',
        seasonsData!,
        'Divisions',
        divisionData!,
        'Teams',
        teamData!
      )
    )
    setTeam('')
    setDivision('')
    setSeason('')
    setDeleteComplete(true)
    // setShowModal(false)
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
            <h2>The following team will be deleted permanently.</h2>
            <h3 className="mt-2 pl-3 font-bold text-[#ff922b]">
              This is your final warning. Once deleted, cannot be undone!
            </h3>
            <p className="mt-7">
              Team to delete:{' '}
              <span className="capitalize text-[#ff922b]">{teamData}</span>
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

export default ShowDeleteTeamModal
