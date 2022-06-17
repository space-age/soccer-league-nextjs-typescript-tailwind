import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import {
  inputsDisable,
  showAddScheduleForm,
  showAddWeekScheduleForm,
  showListOfSchedules,
} from '../../../../atoms/weekScheduleAtoms'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import CurrentScheduleList from '../addSchedule/CurrentScheduleList'
import AddScheduleForm from './AddScheduleForm'
import CreateWeekForm from './CreateWeekForm'

function CreateWeekSchedule() {
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const selectedWeek = useRecoilState(selectedScheduleWeek)

  const [showDivisionList, setShowDivisionList] = useState(false)

  const [showAddWeekSchedulesForm, setShowAddWeekSchedulesForm] =
    useRecoilState(showAddWeekScheduleForm)

  const [showSchedulesForm, setShowSchedulesForm] =
    useRecoilState(showAddScheduleForm)

  const [disableInput, setDisableInput] = useRecoilState(inputsDisable)
  const [showScheduleList, setShowScheduleList] =
    useRecoilState(showListOfSchedules)

  const showWeekSchedulesForm = useRecoilValue(showAddWeekScheduleForm)
  const showAddSchedulesForm = useRecoilValue(showAddScheduleForm)
  const showListSchedules = useRecoilValue(showListOfSchedules)

  /*
    handles if season or division have been selected then set the state to true
    so the team form can be displayed. if season or team get diselected, then team form 
    will go away
  */
  useEffect(() => {
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0
    ) {
      setShowSchedulesForm(false)
      setShowAddWeekSchedulesForm(false)
      setDisableInput(false)
      setShowScheduleList(false)
    } else setShowAddWeekSchedulesForm(true)
  }, [season, division])

  /*
  handles if season is selected, then will set the state to true so
  division dropdown menu shows
  */
  useEffect(() => {
    if (!season || season?.length === 0) {
      setShowSchedulesForm(false)
      setShowDivisionList(false)
      setDisableInput(false)
      setShowScheduleList(false)
    } else setShowDivisionList(true)
  }, [season])

  return (
    <div className="mb-3 rounded border-2 border-white bg-[#eceff1] p-2 ">
      <h2 className="text-2xl font-bold text-[#006064]">
        To create a new week schedule, start with selecting a season.
      </h2>
      <div className="mt-3 flex flex-row gap-10">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold">Select Season:</h3>
          <SeasonList />
        </div>
        {showDivisionList && (
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold ">Select Division:</h3>
            <DivisionList />
          </div>
        )}
      </div>
      {showWeekSchedulesForm && <CreateWeekForm />}
      {showAddSchedulesForm && <AddScheduleForm />}
      {showListSchedules && (
        <div className="my-5 rounded-sm border-2  border-[#ccc] bg-[#eeeeee] p-3">
          <div>
            <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
              Schedules for:{' '}
              <span className="text-[#006064]">{selectedWeek}</span>
            </h1>
            <CurrentScheduleList />
          </div>
          <h3>Done Submitting Schedules Click the button to restart form</h3>
          <button>Finish Submitting Schedules</button>
        </div>
      )}
    </div>
  )
}

export default CreateWeekSchedule
