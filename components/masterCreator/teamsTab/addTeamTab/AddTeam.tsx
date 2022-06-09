import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../../../../atoms/seasonAtoms'
import DivisionList from '../../commonComponents/seasonsData/DivisionList'
import SeasonList from '../../commonComponents/seasonsData/SeasonList'
import AddTeamForm from './AddTeamForm'

function AddTeam() {
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!season || season?.length === 0 || !division || division?.length === 0)
      setShowForm(false)
    else setShowForm(true)
  }, [season, division])

  return (
    <div className="rounded border-2 border-white bg-[#eceff1] p-2">
      <h2 className="text-xl font-semibold">
        To add a team, please choose a season and division.
      </h2>
      <div className="mt-3 flex flex-row gap-10">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold underline underline-offset-2">
            Select Season:
          </h3>
          <SeasonList />
          {/* <p className="text-sm text-[red]">*** Please select a season</p> */}
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold underline underline-offset-2">
            Select Division:
          </h3>
          <DivisionList />
          {/* <p className="text-sm text-[red]">*** Please select a division</p> */}
        </div>
      </div>
      {showForm && <AddTeamForm />}
    </div>
  )
}

export default AddTeam
