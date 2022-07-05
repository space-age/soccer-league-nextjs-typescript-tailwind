import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import ScheduleList from '../../commonComponents/seasonsData/lists/ScheduleList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { modalState } from '../../../../atoms/seasonModalAtoms'
import AssignSeasonPlusWeekModal from './AssignSeasonPlusWeekModal'

function AssignSeasonPlusWeekContainer() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showTeamList, setShowTeamList] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showModal, setShowModal] = useRecoilState(modalState)

  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const weekSchedule = useRecoilValue(selectedScheduleWeek)

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
      !weekSchedule ||
      weekSchedule.idName.length === 0
    )
      setShowAddForm(false)
    else setShowAddForm(true)
  }, [season, division, weekSchedule])

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

  const handleAssignButton = async () => {
    const listRef = doc(db, 'More', 'Assignments')
    await updateDoc(listRef, {
      currentSeason: season,
      currentWeekSchedule: weekSchedule,
    })
    setShowModal(true)
  }

  return (
    <div className="rounded border-2 border-white bg-[#eceff1] p-2">
      <h2 className="masterCreator--tabTitle">
        Begin by selecting the season you will like to assign as the default
        season to display in Main Page
      </h2>
      <div className="flex flex-col">
        <div className=" mt-3 flex flex-col">
          <h3 className="text-2xl font-semibold">Select Season:</h3>

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
            Lastly, select the schedule week to assign as the default schedule
            to display in Main Page
          </h3>
          <ScheduleList />
        </div>
      )}
      {showAddForm && (
        <button
          onClick={handleAssignButton}
          className="mt-2  content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]"
        >
          Assign the Season and Schedule Week Selected
        </button>
      )}
      {showModal && <AssignSeasonPlusWeekModal />}
    </div>
  )
}

export default AssignSeasonPlusWeekContainer
