import React from 'react'
import { Playoff } from '../../../typings'

interface Props {
  gameNumber: string
  game: Playoff
}

/**
 * Container for the match with the team names, date, time, field number, and final scored
 * @param gameNumber
 * @param game
 * @returns the details of the match
 */
function FinalGame({ gameNumber, game }: Props) {
  let winner = 'none'

  /**
   * If statements to determine the winnder of the match by comparing the scores
   */
  if (game?.scoredA && game?.scoredB && game.scoredA! > game.scoredB!) {
    winner = 'teamA'
  }
  if (game?.scoredB && game?.scoredA && game.scoredA! < game.scoredB!) {
    winner = 'teamB'
  }
  if (game?.scoredB && game?.scoredA && game.scoredA! === game.scoredB!) {
    winner = 'tied'
  }

  return (
    <div>
      <h4 className="my-4 ml-4 text-xl font-bold md:text-2xl">
        Game {gameNumber}
      </h4>
      <div>
        <div className="mt-1 ml-3 flex justify-center gap-10 text-lg font-semibold sm:flex-col sm:gap-0 md:flex-row md:gap-10 md:text-xl">
          <p className="">
            Date:{' '}
            <span className=" text-[#0097a7]">
              {!game?.date || game?.date.length === 0 ? 'TBD' : game?.date}
            </span>
          </p>
          <p className="">
            Time:{' '}
            <span className="text-[#0097a7]">
              {!game?.time || game?.time.length === 0 ? 'TBD' : game?.time}
            </span>
          </p>
        </div>

        <div className="mx-3 grid grid-rows-2 border-[2px] border-[#006064] ">
          <div
            className={`${winner === 'teamA' && 'bg-green-400'} ${
              winner === 'tied' && 'bg-[#80deea]'
            } grid grid-cols-6 text-lg font-semibold md:text-xl`}
          >
            <p className="col-start-1 col-end-6  border-b-[2px] border-r-[2px]	border-[#006064] p-1">
              {!game?.teamA || game?.teamA.length === 0
                ? 'TEAM A'
                : game?.teamA}
            </p>
            <p className=" border-b-[2px] border-[#006064] p-1 text-center">
              {game?.scoredA === null || game?.scoredA === undefined
                ? '( )'
                : game?.scoredA}
            </p>
          </div>
          <div
            className={`${winner === 'teamB' && 'bg-green-400'} ${
              winner === 'tied' && 'bg-[#80deea]'
            } grid grid-cols-6 text-lg font-semibold md:text-xl`}
          >
            <p className=" col-start-1 col-end-6	 border-r-[2px] border-[#006064] p-1">
              {!game?.teamB || game?.teamB.length === 0
                ? 'TEAM B'
                : game?.teamB}
            </p>
            <p className="p-1 text-center">
              {game?.scoredB === null || game?.scoredB === undefined
                ? '( )'
                : game?.scoredB}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-center text-lg font-semibold md:text-xl">
            Field:{' '}
            <span className="text-[#0097a7]">
              {game?.fieldNumber === null || game?.fieldNumber === undefined
                ? 'TBD'
                : game?.fieldNumber}
            </span>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default FinalGame
