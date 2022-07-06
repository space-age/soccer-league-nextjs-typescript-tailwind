import React from 'react'
import usePlayoffBracket from '../../../../hooks/usePlayoffBracket'
import FinalsMatches from '../../largerScreens/FinalsMatches'

function QuarterFinalsContainerMobile() {
  const selectedPlayoffBracket = usePlayoffBracket()

  const quarterFinalsBracket = selectedPlayoffBracket.find(
    (bracket) => bracket.idName === 'QuarterFinals'
  )

  const match1Games = [
    quarterFinalsBracket?.match1Game1,
    quarterFinalsBracket?.match1Game2,
  ]
  const match2Games = [
    quarterFinalsBracket?.match2Game1,
    quarterFinalsBracket?.match2Game2,
  ]
  const match3Games = [
    quarterFinalsBracket?.match3Game1,
    quarterFinalsBracket?.match3Game2,
  ]
  const match4Games = [
    quarterFinalsBracket?.match4Game1,
    quarterFinalsBracket?.match4Game2,
  ]

  return (
    <div>
      <div className="mt-5 bg-[#37474f] p-3">
        <h2 className="text-center text-2xl font-semibold text-white">
          Quarter-Finals
        </h2>
      </div>
      <FinalsMatches stage="" match="1" game={match1Games} />
      <FinalsMatches stage="" match="2" game={match2Games} />
      <FinalsMatches stage="" match="3" game={match3Games} />
      <FinalsMatches stage="" match="4" game={match4Games} />
    </div>
  )
}

export default QuarterFinalsContainerMobile
