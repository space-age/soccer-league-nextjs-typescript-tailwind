import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedSeason,
  selectedTeam,
} from '../../../../atoms/seasonAtoms'
import { modalStateRemoveTeam } from '../../../../atoms/seasonModalAtoms'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import TeamList from '../../commonComponents/seasonsData/lists/TeamList'
import ShowDeleteTeamModal from './showDeleteTeamModal'

function DeleteTeam() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showTeamList, setShowTeamList] = useState(false)
  const [showDeleteButton, setShowDeleteButton] = useState(false)

  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const team = useRecoilValue(selectedTeam)

  const [showModal, setShowModal] = useRecoilState(modalStateRemoveTeam)

  const handleDeleteSeason = () => {
    if (!(!team || team.length === 0)) setShowModal(true)
  }

  /*
    handles if season or division have been selected then set the state to true
    so the team list can be displayed. if season or team get diselected, then team list 
    will go away
  */
  useEffect(() => {
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0 ||
      !team ||
      team?.length === 0
    )
      setShowDeleteButton(false)
    else setShowDeleteButton(true)
  }, [season, division, team])

  /*
    handles if season or division have been selected then set the state to true
    so the team list can be displayed. if season or team get diselected, then team list 
    will go away
  */
  useEffect(() => {
    if (!season || season?.length === 0 || !division || division?.length === 0)
      setShowTeamList(false)
    else setShowTeamList(true)
  }, [season, division])

  /*
    handles if season is selected, then will set the state to true so
    division dropdown menu shows
  */
  useEffect(() => {
    if (!season || season?.length === 0) setShowDivisionList(false)
    else setShowDivisionList(true)
  }, [season])

  return (
    <div className="rounded border-2 border-white bg-[#eceff1] p-2">
      <h2 className=" text-xl font-semibold">
        Deleting a team will remove all data within the team.
      </h2>
      <h3 className="text-lg text-[red]">
        A warning window with a final deletion verification will be prompted.
        Once delete is click to do a final confirmation on the deletion.
      </h3>
      <div className="flex flex-col">
        <h3 className="mt-3 text-2xl font-bold">Start by selecting a Season</h3>
        <div className=" flex flex-col">
          {/* <h3 className="text-xl font-semibold underline underline-offset-2">
            Select Season:
          </h3> */}
          <SeasonList />
        </div>
      </div>
      {showDivisionList && (
        <div className="flex flex-col">
          <h3 className="mt-3 text-2xl font-bold">Next, select a division</h3>
          {/* <h3 className="text-xl font-semibold underline underline-offset-2">
            Select Division:
          </h3> */}
          <DivisionList />
        </div>
      )}
      {showTeamList && (
        <div className="flex flex-col">
          <h3 className="mt-3 text-2xl font-bold">Select team to delete</h3>
          <TeamList />
        </div>
      )}
      {showDeleteButton && (
        <button
          onClick={handleDeleteSeason}
          className="mt-2 w-[18%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]"
        >
          Delete Selected Team
        </button>
      )}
      {showModal && <ShowDeleteTeamModal />}
    </div>
  )
}

export default DeleteTeam
