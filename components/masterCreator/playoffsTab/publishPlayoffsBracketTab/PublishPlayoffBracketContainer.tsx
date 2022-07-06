import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { showPublishBracketModal } from '../../../../atoms/playoffsAtoms'
import {
  selectedDivision,
  selectedPlayoffBracket,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { db } from '../../../../firebase'
import DivisionList from '../../commonComponents/seasonsData/lists/DivisionList'
import PlayoffBracketList from '../../commonComponents/seasonsData/lists/PlayoffBracketList'
import SeasonList from '../../commonComponents/seasonsData/lists/SeasonList'
import PublishPlayoffBracketModal from './PublishPlayoffBracketModal'

function PublishPlayoffBracketContainer() {
  const [showDivisionList, setShowDivisionList] = useState(false)
  const [showBracketList, setShowBracketList] = useState(false)
  const [showDeleteButton, setShowDeleteButton] = useState(false)

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
      setShowDeleteButton(false)
    else setShowDeleteButton(true)
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

  const [showModal, setShowModal] = useRecoilState(showPublishBracketModal)

  const handlePublishButton = async () => {
    if (!(!playoffBracket || playoffBracket.idName.length === 0)) {
      const listRef = doc(
        db,
        'Seasons',
        season!,
        'Divisions',
        division!,
        'Playoffs-Brackets',
        playoffBracket.idName
      )
      await updateDoc(listRef, {
        pushed: true,
      })
    }
    setShowModal(true)
  }

  return (
    <div className="mb-3 rounded border-2 border-white bg-[#eceff1] p-2 ">
      <h2 className="masterCreator--tabTitle">
        Select the playoff bracket to be publish, meaning it will become
        viewable in the Main Page
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
            Lastly, select the bracket to publish
          </h3>
          <PlayoffBracketList />
        </div>
      )}
      {showDeleteButton && (
        <button
          onClick={handlePublishButton}
          className="mt-2 w-[30%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]"
        >
          Publish Selected Playoff Bracket
        </button>
      )}
      {showModal && <PublishPlayoffBracketModal />}
    </div>
  )
}

export default PublishPlayoffBracketContainer
