import {
  modalStateRemoveSeason,
  selectedSeason,
} from '../../../../atoms/removeSeasonModalAtoms'

import { useRecoilState, useRecoilValue } from 'recoil'

import useSeasonList from '../../../../hooks/useSeasonList'
import SeasonList from '../SeasonList'
import ShowRemoveSeasonModal from './ShowRemoveSeasonModal'

function DeleteSeason() {
  const [showModal, setShowModal] = useRecoilState(modalStateRemoveSeason)
  const data = useRecoilValue(selectedSeason)

  const handleDeleteSeason = () => {
    if (!data || data.length === 0) {
      return
    } else setShowModal(true)
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
