import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedPlayoffBracket,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import PlayoffBracketList from '../../commonComponents/seasonsData/lists/PlayoffBracketList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import AddPlayoffsGamesContainer from '../createPlayoffsBracketTab/AddPlayoffsGamesContainer'

function EditPlayoffsBracketContainer() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showBracketList, setShowBracketList] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const playoffBracket = useRecoilValue(selectedPlayoffBracket)

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
      !playoffBracket ||
      playoffBracket.idName.length === 0
    )
      setShowAddForm(false)
    else setShowAddForm(true)
  }, [season, division, playoffBracket])

  /*
    handles if season or division have been selected then set the state to true
    so the team list can be displayed. if season or team get diselected, then team list 
    will go away
  */
  useEffect(() => {
    if (!season || season?.length === 0 || !division || division?.length === 0)
      setShowBracketList(false)
    else setShowBracketList(true)
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
        To edit a playoff bracket, start with selecting a season.
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
      {showBracketList && (
        <div className="flex flex-col">
          <h3 className="mt-3 text-2xl font-bold">
            Lastly, select the bracket to edit
          </h3>
          <PlayoffBracketList />
        </div>
      )}
      {showAddForm && <AddPlayoffsGamesContainer />}
    </div>
  )
}

export default EditPlayoffsBracketContainer
