import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../../../../atoms/seasonAtoms'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import AddScheduleForm from './AddScheduleForm'
import CreateWeekForm from './CreateWeekForm'

function CreateWeekSchedule() {
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  const [showAddWeekScheduleForm, setShowAddWeekScheduleForm] = useState(false)
  const [showAddSchedulesForm, setShowAddSchedulesForm] = useState(true)

  const [showDivisionList, setShowDivisionList] = useState(false)

  const handleShowAddSchedulesForm = (state: boolean) => {
    setShowAddSchedulesForm(state)
  }

  /*
    handles if season or division have been selected then set the state to true
    so the team form can be displayed. if season or team get diselected, then team form 
    will go away
  */
  useEffect(() => {
    if (!season || season?.length === 0 || !division || division?.length === 0)
      setShowAddWeekScheduleForm(false)
    else setShowAddWeekScheduleForm(true)
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
      {showAddWeekScheduleForm && (
        <CreateWeekForm
          handleShowAddSchedulesForm={handleShowAddSchedulesForm}
        />
      )}
      {showAddSchedulesForm && <AddScheduleForm />}
    </div>
  )
}

export default CreateWeekSchedule
