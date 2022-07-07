import React, { useState } from 'react'
import usePlayoffBracket from '../../../../hooks/usePlayoffBracket'
import PlayoffGame from './PlayoffGame'
import { v4 as uuidv4 } from 'uuid'

function PlayoffBracketContainer() {
  const Tabs = [
    { id: '1', name: 'Quarter Finals' },
    { id: '2', name: 'Semi Finals' },
    { id: '3', name: 'Finals' },
  ]

  const [currentTab, setCurrentTab] = useState(Tabs[0].id)

  const playOffGames = usePlayoffBracket()

  const quarterFinalsBracket = playOffGames.find(
    (bracket) => bracket.idName === 'QuarterFinals'
  )

  const semiFinalsBracket = playOffGames.find(
    (bracket) => bracket.idName === 'SemiFinals'
  )

  const finalsBracket = playOffGames.find(
    (bracket) => bracket.idName === 'Finals'
  )

  const handlerTabButton = (e: any) => {
    e.preventDefault()
    setCurrentTab(e.target.id)
  }

  return (
    <div className="my-5 ">
      <div>
        <div className="bg-[#455a64] p-1"></div>
        <div className="flex  text-lg ">
          {Tabs.map((tab, index) => (
            <button
              key={uuidv4()}
              onClick={handlerTabButton}
              id={tab.id}
              className={`w-[20%] rounded-bl-lg
             rounded-br-lg border-2 border-l-0 border-t-0 border-[#00838f] bg-[#eeeeee]  p-2 tracking-wider hover:bg-[#cfd8dc]  disabled:bg-[#00838f] disabled:text-white`}
              disabled={currentTab === tab.id}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/*Quarter Final Tab  */}
        <div className={`${currentTab === '1' ? '' : 'hidden'} mx-3 mt-3`}>
          {/*Match 1*/}
          <p className="playoffs--match">Match 1</p>
          {/* Game 1 for Match 1 */}
          <p className="playoffs--game">Game 1</p>
          <PlayoffGame
            stage="QuarterFinals"
            matchGame="match1Game1"
            game={quarterFinalsBracket?.match1Game1}
          />
          {/* Game 2 for Match 1 */}
          <p className="playoffs--game">Game 2</p>
          <PlayoffGame
            stage="QuarterFinals"
            matchGame="match1Game2"
            game={quarterFinalsBracket?.match1Game2}
          />

          {/*Match 2*/}
          <p className="playoffs--match">Match 2</p>
          {/* Game 1 for Match 2 */}
          <p className="playoffs--game">Game 1</p>
          <PlayoffGame
            stage="QuarterFinals"
            matchGame="match2Game1"
            game={quarterFinalsBracket?.match2Game1}
          />
          {/* Game 2 for Match 2 */}
          <p className="playoffs--game">Game 2</p>
          <PlayoffGame
            stage="QuarterFinals"
            matchGame="match2Game2"
            game={quarterFinalsBracket?.match2Game2}
          />

          {/*Match 3*/}
          <p className="playoffs--match">Match 3</p>
          {/* Game 1 for Match 3 */}
          <p className="playoffs--game">Game 1</p>
          <PlayoffGame
            stage="QuarterFinals"
            matchGame="match3Game1"
            game={quarterFinalsBracket?.match3Game1}
          />
          {/* Game 2 for Match 3 */}
          <p className="playoffs--game">Game 2</p>
          <PlayoffGame
            stage="QuarterFinals"
            matchGame="match3Game2"
            game={quarterFinalsBracket?.match3Game2}
          />

          {/*Match 4*/}
          <p className="playoffs--match">Match 4</p>
          {/* Game 1 for Match 4 */}
          <p className="playoffs--game">Game 1</p>
          <PlayoffGame
            stage="QuarterFinals"
            matchGame="match4Game1"
            game={quarterFinalsBracket?.match4Game1}
          />
          {/* Game 2 for Match 4 */}
          <p className="playoffs--game">Game 2</p>
          <PlayoffGame
            stage="QuarterFinals"
            matchGame="match4Game2"
            game={quarterFinalsBracket?.match4Game2}
          />
        </div>

        {/* SemiFinals Tab */}
        <div className={`${currentTab === '2' ? '' : 'hidden'} mx-3 mt-3 `}>
          {/*Match 1*/}
          <p className="playoffs--match">Match 1</p>
          {/* Game 1 for Match 1 */}
          <p className="playoffs--game">Game 1</p>
          <PlayoffGame
            stage="SemiFinals"
            matchGame="match1Game1"
            game={semiFinalsBracket?.match1Game1}
          />
          {/* Game 2 for Match 1 */}
          <p className="playoffs--game">Game 2</p>
          <PlayoffGame
            stage="SemiFinals"
            matchGame="match1Game2"
            game={semiFinalsBracket?.match1Game2}
          />

          {/*Match 2*/}
          <p className="playoffs--match">Match 2</p>
          {/* Game 1 for Match 2 */}
          <p className="playoffs--game">Game 1</p>
          <PlayoffGame
            stage="SemiFinals"
            matchGame="match2Game1"
            game={semiFinalsBracket?.match2Game1}
          />
          {/* Game 2 for Match 2 */}
          <p className="playoffs--game">Game 2</p>
          <PlayoffGame
            stage="SemiFinals"
            matchGame="match2Game2"
            game={semiFinalsBracket?.match2Game2}
          />
        </div>

        {/* Final Match Tab */}
        <div className={`${currentTab === '3' ? '' : 'hidden'} mx-3 mt-3 `}>
          <p className="playoffs--match">Final Match</p>
          <PlayoffGame
            stage="Finals"
            matchGame="final"
            game={finalsBracket?.final}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayoffBracketContainer
