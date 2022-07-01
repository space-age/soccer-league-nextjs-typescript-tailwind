import React, { useState } from 'react'
import usePlayoffBracket from '../../../../hooks/usePlayoffBracket'
import PlayoffGame from './PlayoffGame'

function PlayoffBracketContainer() {
  const quarterFinalsBracket = usePlayoffBracket('QuarterFinals')
  const semiFinalsBracket = usePlayoffBracket('SemiFinals')
  const finalsBracket = usePlayoffBracket('Finals')

  const [editMode, setEditMode] = useState(false)

  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      <p className="schedule--label">Quarter-Finals</p>
      {/*Match 1*/}
      <p className="playoffs--match">Match 1</p>
      {/* Game 1 for Match 1 */}
      <p className="playoffs--game">Game 1</p>
      <PlayoffGame game={quarterFinalsBracket?.match1Game1} />
      {/* Game 2 for Match 1 */}
      <p className="playoffs--game">Game 2</p>

      {/*Match 2*/}
      <p className="playoffs--match">Match 2</p>
      {/* Game 1 for Match 2 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 3 */}
      <p className="playoffs--game">Game 2</p>

      {/*Match 3*/}
      <p className="playoffs--match">Match 3</p>
      {/* Game 1 for Match 3 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 3 */}
      <p className="playoffs--game">Game 2</p>

      {/*Match 4*/}
      <p className="playoffs--match">Match 4</p>
      {/* Game 1 for Match 4 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 4 */}
      <p className="playoffs--game">Game 2</p>

      <p className="schedule--label">Semi-Finals</p>

      {/*Match 1*/}
      <p className="playoffs--match">Match 1</p>
      {/* Game 1 for Match 1 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 1 */}
      <p className="playoffs--game">Game 2</p>

      {/*Match 2*/}
      <p className="playoffs--match">Match 2</p>
      {/* Game 1 for Match 2 */}
      <p className="playoffs--game">Game 1</p>
      {/* Game 2 for Match 3 */}
      <p className="playoffs--game">Game 2</p>

      <p className="schedule--label">Final</p>
      {/* Final Match */}
      <p className="playoffs--match">Final Match</p>
    </div>
  )
}

export default PlayoffBracketContainer
