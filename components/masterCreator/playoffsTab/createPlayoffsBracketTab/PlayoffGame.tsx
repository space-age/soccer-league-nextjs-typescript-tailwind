import { useState } from 'react'
import { Playoff } from '../../../../typings'
import EditPlayoffGameForm from './EditPlayoffGameForm'
import PlayoffOfficialGame from './PlayoffOfficialGame'

interface Props {
  game: Playoff
}

function PlayoffGame({ game }: Props) {
  const [editMode, setEditMode] = useState(false)

  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {<PlayoffOfficialGame game={game} />}
      <div className=" flex justify-center ">
        <button
          onClick={handleEditClick}
          className=" w-[15%]  justify-center rounded bg-[#00838f] text-base font-semibold  uppercase tracking-wider text-white hover:bg-[#006064]"
        >
          edit
        </button>

        {/* {!editMode && <PlayoffOfficialGame game={game} />} */}
        {/* {!editMode && (
          <button
            onClick={handleEditClick}
            className=" w-[15%]  justify-center rounded bg-[#00838f] text-base font-semibold  uppercase tracking-wider text-white hover:bg-[#006064]"
          >
            edit
          </button>
        )} */}
      </div>
      {editMode && (
        <EditPlayoffGameForm game={game} handleEditClick={handleEditClick} />
      )}
    </div>
  )
}

export default PlayoffGame
