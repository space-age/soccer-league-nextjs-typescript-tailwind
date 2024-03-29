import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import ScheduleList from '../../commonComponents/seasonsData/lists/ScheduleList'
import ScheduleListContainer from '../addScheduleTab/ScheduleListContainer'
import EditScheduleList from './EditScheduleList'
import AddScheduleForm from '../createWeekScheduleTab/AddScheduleForm'

/**
 * By selecting season->division->week schedule, then display form add schedules.
 * Also, displays container of all schedules under the week-schedule selected
 */
function EditScheduleContainer() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showTeamList, setShowTeamList] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

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

  return (
    <div className="mb-3 rounded border-2 border-white bg-[#eceff1] p-2 ">
      <h2 className="masterCreator--tabTitle">
        To add or edit a schedule, start with selecting a season.
      </h2>
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
            Lastly, select a week to add schedules
          </h3>
          <ScheduleList />
        </div>
      )}
      {showAddForm && <AddScheduleForm />}
      {showAddForm && <EditScheduleList />}
    </div>
  )
}

export default EditScheduleContainer
