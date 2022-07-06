import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  inputsDisablePlayoffs,
  showCreateRoundForm,
} from '../../../../atoms/playoffsAtoms'
import {
  selectedDivision,
  selectedPlayoffBracket,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import AddPlayoffsGamesContainer from './AddPlayoffsGamesContainer'
import CreatePlayoffBracketForm from './CreatePlayoffBracketForm'

function CreatePlayoffsBracketContainer() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showCreateBracketForm, setShowCreateBracketForm] = useState(false)
  const [disableInput, setDisableInput] = useRecoilState(inputsDisablePlayoffs)

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
    } else setShowDivisionList(true)
  }, [season])

  const resetSeason = useResetRecoilState(selectedSeason)
  const resetDivision = useResetRecoilState(selectedDivision)
  const resetPalyoffBracket = useResetRecoilState(selectedPlayoffBracket)

  const handleAnotherBracketButton = () => {
    setShowCreateBracketForm(false) // hides the add bracket form and resets the form
    setShowCreateRoundsForm(false) // hides the create round form
    setDisableInput(false) // enables the input for week schedule name for next form
    resetSeason() // resets to default value for the dropdown option for seasons
    resetDivision() // resets to default value for the dropdown option for divisions
    resetPalyoffBracket() // resets to default value for the dropdown option for playoff bracket
  }
  return (
    <div className="mb-3 rounded border-2 border-white bg-[#eceff1] p-2 ">
      <h2 className="masterCreator--tabTitle">
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
      {showBracketForm && (
        <>
          <AddPlayoffsGamesContainer />
          <div className="flex justify-center">
            <button
              onClick={handleAnotherBracketButton}
              className="m-auto mt-4 w-[30%] rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]"
            >
              Add another bracket
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CreatePlayoffsBracketContainer
