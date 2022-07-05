import { useState } from 'react'
import { Playoff } from '../../../../typings'
import EditPlayoffGameForm from './EditPlayoffGameForm'
import PlayoffOfficialGame from './PlayoffOfficialGame'

interface Props {
  game: Playoff
  stage: string
  matchGame: string
}

function PlayoffGame({ game, stage, matchGame }: Props) {
  const [editMode, setEditMode] = useState(false)

  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {!editMode && <PlayoffOfficialGame game={game} />}
      <div className=" flex justify-center">
        {!editMode && (
          <button
            onClick={handleEditClick}
            className=" w-[15%]  justify-center rounded bg-[#00838f] text-base font-semibold  uppercase tracking-wider text-white hover:bg-[#006064]"
          >
            edit
          </button>
        )}
      </div>
      {editMode && (
        <EditPlayoffGameForm
          game={game}
          handleEditClick={handleEditClick}
          stage={stage}
          matchGame={matchGame}
        />
      )}
    </div>
  )
}

export default PlayoffGame
