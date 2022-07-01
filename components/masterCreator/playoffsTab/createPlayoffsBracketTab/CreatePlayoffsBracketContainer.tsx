import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  inputsDisable,
  showCreateRoundForm,
} from '../../../../atoms/playoffsAtoms'
import { selectedDivision, selectedSeason } from '../../../../atoms/seasonAtoms'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import AddPlayoffsGamesContainer from './AddPlayoffsGamesContainer'
import CreatePlayoffBracketForm from './CreatePlayoffBracketForm'

function CreatePlayoffsBracketContainer() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showCreateBracketForm, setShowCreateBracketForm] = useState(false)
  const [disableInput, setDisableInput] = useRecoilState(inputsDisable)

  const [showCreateRoundsForm, setShowCreateRoundsForm] =
    useRecoilState(showCreateRoundForm)

  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  const showBracketForm = useRecoilValue(showCreateRoundForm)
  /*
    handles if season or division have been selected then set the state to true
    so the playoffs bracket form can be displayed. if season or team get diselected,
     then playoffs bracket form will go away
  */
  useEffect(() => {
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0
    ) {
      setShowCreateBracketForm(false)
      setDisableInput(false)
      setShowCreateRoundsForm(false)
      // setShowScheduleList(false)
    } else setShowCreateBracketForm(true)
  }, [season, division])

  /*
  handles if season is selected:
    if no season selected,
      then will hide the playoffs bracket form, reset division list, disable input name for week schedule
    if season selected,
     then will show the division dropdown menu 
  */
  useEffect(() => {
    if (!season || season?.length === 0) {
      setShowCreateBracketForm(false)
      setShowDivisionList(false)
      setDisableInput(false)
      setShowCreateRoundsForm(false)
      // setShowScheduleList(false)
    } else setShowDivisionList(true)
  }, [season])

  return (
    <div className="mb-3 rounded border-2 border-white bg-[#eceff1] p-2 ">
      <h2 className="text-2xl font-bold text-[#006064]">
        To create a new playoffs bracket, start with selecting a season.
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
      {showCreateBracketForm && <CreatePlayoffBracketForm />}
      <AddPlayoffsGamesContainer />
    </div>
  )
}

export default CreatePlayoffsBracketContainer
