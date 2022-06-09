import { selectedDivision, selectedSeason } from '../../../../atoms/seasonAtoms'
import { modalStateRemoveSeason } from '../../../../atoms/seasonModalAtoms'

import { useRecoilState, useRecoilValue } from 'recoil'

import SeasonList from '../../commonComponents/seasonsData/SeasonList'
import ShowRemoveSeasonModal from './ShowRemoveSeasonModal'
import { useState } from 'react'

function DeleteSeason() {
  const [showModal, setShowModal] = useRecoilState(modalStateRemoveSeason)
  const data = useRecoilValue(selectedSeason)

  const [deleteSelected, setDeletedSelected] = useState(true)

  const handleDeleteSeason = () => {
    if (!data || data.length === 0) {
      setDeletedSelected(false)
    } else {
      setDeletedSelected(true)
      setShowModal(true)
    }
  }

  return (
    <div className="rounded border-2 border-white bg-[#eceff1] p-2">
      <h2 className=" text-xl font-semibold">
        Deleting a season will remove the Entire Season, including all data such
        as Teams, Schedules, Tables.{' '}
      </h2>
      <h3 className="text-lg text-[red]">
        A warning window with a final deletion verification will be prompted
        once delete is click to do a final confirmation on the deletion.
      </h3>
      <div className="mt-3  py-2">
        <p className="text-xl">Select season to delete:</p>
        <SeasonList />
        {!deleteSelected && (
          <p className="text-sm text-[red]">*** Please select a season</p>
        )}
        <button
          onClick={handleDeleteSeason}
          className="mt-2 w-[18%] content-start justify-self-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
        >
          Delete Selected Season
        </button>
      </div>
      {showModal && <ShowRemoveSeasonModal />}
    </div>
  )
}

export default DeleteSeason
