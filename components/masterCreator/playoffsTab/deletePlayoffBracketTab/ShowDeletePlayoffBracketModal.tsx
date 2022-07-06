import MuiModal from '@mui/material/Modal'

import {
  selectedDivision,
  selectedPlayoffBracket,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { modalStateRemoveTeam } from '../../../../atoms/seasonModalAtoms'

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../../../../firebase'
import useTeamList from '../../../../hooks/useTeamList'
import { showDeleteBracketModal } from '../../../../atoms/playoffsAtoms'

function ShowDeletePlayoffBracketModal() {
  const [showModal, setShowModal] = useRecoilState(showDeleteBracketModal)

  const bracketPlayoffData = useRecoilValue(selectedPlayoffBracket)
  const seasonsData = useRecoilValue(selectedSeason)
  const divisionData = useRecoilValue(selectedDivision)

  const resetBracketPlayoffData = useResetRecoilState(selectedPlayoffBracket)
  const resetDivision = useResetRecoilState(selectedDivision)
  const resetSeason = useResetRecoilState(selectedSeason)

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
        'Playoffs-Brackets',
        bracketPlayoffData.idName
      )
    )
    resetBracketPlayoffData()
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
            <h2>The following Playoff Bracket will be deleted permanently.</h2>
            <h3 className="mt-2 pl-3 font-bold text-[#ff922b]">
              This is your final warning. Once deleted, cannot be undone!
            </h3>
            <p className="mt-7">Playoff Bracket to delete: </p>
            <div className="ml-3 capitalize text-[#ff922b]">
              <p>
                <span className="text-[#ccc]">Playoff Bracket Name: </span>
                {bracketPlayoffData.bracketName}
              </p>
              <p>
                <span className="text-[#ccc]">Playoff Bracket Date: </span>
                {bracketPlayoffData.date}
              </p>
            </div>

            <button
              onClick={handleDeleteSeason}
              className="text-bold mt-6 rounded border-2 border-black bg-red-500 p-1 hover:bg-red-300 hover:text-black"
            >
              Delete Playoff Bracket
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

export default ShowDeletePlayoffBracketModal
