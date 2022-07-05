import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { modalStateRemoveTeam } from '../../../../atoms/seasonModalAtoms'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import ScheduleList from '../../commonComponents/seasonsData/lists/ScheduleList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import ShowDeleteWeekScheduleModal from './ShowDeleteWeekScheduleModal'

function DeleteWeekScheduleContainer() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showTeamList, setShowTeamList] = useState(false)
  const [showDeleteButton, setShowDeleteButton] = useState(false)

  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const weekSchedule = useRecoilValue(selectedScheduleWeek)

  const [showModal, setShowModal] = useRecoilState(modalStateRemoveTeam)

  const handleDeleteSeason = () => {
    if (!(!weekSchedule || weekSchedule.idName.length === 0)) setShowModal(true)
  }

  /*
    handles if season or division have been selected then set the state to true
    so the weekSchedule list can be displayed. if season or weekSchedule get diselected, then weekSchedule list 
    will go away
  */
  useEffect(() => {
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0 ||
      !weekSchedule ||
      weekSchedule.idName.length === 0
    )
      setShowDeleteButton(false)
    else setShowDeleteButton(true)
  }, [season, division, weekSchedule])

  /*
    handles if season or division have been selected then set the state to true
    so the weekSchedule list can be displayed. if season or weekSchedule get diselected, then weekSchedule list 
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
      <h2 className=" masterCreator--tabTitle">
        Deleting a week schedule will remove all schedules inside the week
        schedule.
      </h2>
      <h3 className="text-lg text-[red]">
        A warning window with a final deletion verification will be prompted.
        Once delete is click to do a final confirmation on the deletion.
      </h3>
      <div className="flex flex-col">
        <h3 className="mt-3 text-2xl font-bold">Start by selecting a Season</h3>
        <div className=" flex flex-col">
          <SeasonList />
        </div>
      </div>
      {showDivisionList && (
        <div className="flex flex-col">
          <h3 className="mt-3 text-2xl font-bold">Next, select a division</h3>
          <DivisionList />
        </div>
      )}
      {showTeamList && (
        <div className="flex flex-col">
          <h3 className="mt-3 text-2xl font-bold">
            Lastly, select a week to delete schedules
          </h3>
          <ScheduleList />
        </div>
      )}
      {showDeleteButton && (
        <button
          onClick={handleDeleteSeason}
          className="mt-2 w-[25%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]"
        >
          Delete Selected Week Schedule
        </button>
      )}
      {showModal && <ShowDeleteWeekScheduleModal />}
    </div>
  )
}

export default DeleteWeekScheduleContainer
