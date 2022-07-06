import React from 'react'
import { Playoff } from '../../../typings'
import FinalGame from './FinalGame'

interface Props {
  match: string
  stage: string
  game: Playoff[]
}
function FinalsMatches({ match, stage, game }: Props) {
  return (
    <div
      className={`${
        stage === 'semi-final'
          ? 'bg-[#f5f5f5]'
          : stage === 'final'
          ? 'bg-[#fafafa]'
          : 'bg-[#eeeeee]'
      }  pt-5 pb-2`}
    >
      <h3 className=" bg-[#006064] p-1 text-center text-xl font-semibold text-white">
        Match {match}
      </h3>
      <FinalGame gameNumber="1" game={game[0]} />
      {!(stage === 'final') && <FinalGame gameNumber="2" game={game[1]} />}
    </div>
  )
}

export default FinalsMatches
