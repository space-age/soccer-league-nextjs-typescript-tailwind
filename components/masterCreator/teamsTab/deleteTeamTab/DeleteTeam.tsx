import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../../../../atoms/seasonAtoms'
import DivisionList from '../../commonComponents/seasonsData/DivisionList'
import SeasonList from '../../commonComponents/seasonsData/SeasonList'
import TeamList from '../../commonComponents/seasonsData/TeamList'

function DeleteTeam() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showList, setShowList] = useState(false)

  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  /*
    handles if season or division have been selected then set the state to true
    so the team list can be displayed. if season or team get diselected, then team list 
    will go away
  */
  useEffect(() => {
    if (!season || season?.length === 0 || !division || division?.length === 0)
      setShowList(false)
    else setShowList(true)
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
      <h3 className="mt-4 text-2xl font-bold">Start by selecting a Season</h3>
      <div className="mt-3 flex flex-row gap-10">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold underline underline-offset-2">
            Select Season:
          </h3>
          <SeasonList />
        </div>
        {showDivisionList && (
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold underline underline-offset-2">
              Select Division:
            </h3>
            <DivisionList />
          </div>
        )}
      </div>
      {showList && (
        <div className="mt-5 ">
          <h3 className="text-xl font-semibold underline underline-offset-2">
            Select team to delete:
          </h3>
          <TeamList />
        </div>
      )}
      <button
        // onClick={handleDeleteSeason}
        className="mt-2 w-[18%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]"
      >
        Delete Selected Team
      </button>
    </div>
  )
}

export default DeleteTeam
