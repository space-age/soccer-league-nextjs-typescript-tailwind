import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import {
  selectedDivision,
  selectedPlayoffBracket,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { modalState } from '../../../../atoms/seasonModalAtoms'
import PlayoffBracketList from '../../commonComponents/seasonsData/lists/PlayoffBracketList'
import AssignPlayoffBracketModal from './AssignPlayoffBracketModal'

function AssignPlayoffBracketContainer() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showTeamList, setShowTeamList] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showModal, setShowModal] = useRecoilState(modalState)

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
      currentPlayoffBracket: playoffBracket,
      currentPlayoffDivision: division,
      currentPlayoffSeason: season,
    })
    setShowModal(true)
  }

  return (
    <div className="rounded border-2 border-white bg-[#eceff1] p-2">
      <h2 className="masterCreator--tabTitle">
        Begin by selecting the season you will like to assign the default
        playoff bracket to display in Main Page
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
          <PlayoffBracketList />
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
      {showModal && <AssignPlayoffBracketModal />}
    </div>
  )
}

export default AssignPlayoffBracketContainer
