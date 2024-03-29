import { selectedSeason } from '../../../../atoms/seasonAtoms'
import { modalStateRemoveSeason } from '../../../../atoms/seasonModalAtoms'

import { useRecoilState, useRecoilValue } from 'recoil'

import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import ShowRemoveSeasonModal from './ShowDeleteSeasonModal'
import { useState } from 'react'

/**
 * Delete a season by selecting from dropdown of all seasons in database
 * Button to delete selected season, will set modal state to true to display
 * message to double-check if the selected season is to be deleted
 */
function DeleteSeason() {
  const [showModal, setShowModal] = useRecoilState(modalStateRemoveSeason)
  const data = useRecoilValue(selectedSeason)

  const [deleteSelected, setDeletedSelected] = useState(true)

  /**
   * Handler for delete selected season button
   * Sets the state of deleted selected season and modal to true
   */
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
      <h2 className="masterCreator--tabTitle">
        Deleting a season will remove the Entire Season, including all data such
        as Teams, Schedules, Tables.{' '}
      </h2>
      <h3 className="text-lg text-[red]">
        A warning window with a final deletion verification will be prompted.
        Once delete is click to do a final confirmation on the deletion.
      </h3>
      <div className="mt-3 ">
        <p className="text-2xl font-bold">Select season to delete:</p>
        <SeasonList />
        {!deleteSelected && (
          <p className="text-sm text-[red]">*** Please select a season</p>
        )}
        <button
          onClick={handleDeleteSeason}
          className="mt-2 w-[20%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]"
        >
          Delete Selected Season
        </button>
      </div>
      {showModal && <ShowRemoveSeasonModal />}
    </div>
  )
}

export default DeleteSeason
