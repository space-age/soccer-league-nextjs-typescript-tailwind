import React from 'react'
import usePlayoffBracket from '../../../../hooks/usePlayoffBracket'
import FinalsMatches from '../../largerScreens/FinalsMatches'

function SemiFinalsContainerMobile() {
  const selectedPlayoffBracket = usePlayoffBracket()

  const semiFinalsBracket = selectedPlayoffBracket.find(
    (bracket) => bracket.idName === 'SemiFinals'
  )

  const match1Games = [
    semiFinalsBracket?.match1Game1,
    semiFinalsBracket?.match1Game2,
  ]
  const match2Games = [
    semiFinalsBracket?.match2Game1,
    semiFinalsBracket?.match2Game2,
  ]
  return (
    <div>
      <div className="mt-5 bg-[#455a64] p-3">
        <h2 className=" text-center text-2xl font-semibold text-white  ">
          Semi-Finals
        </h2>
      </div>
      <FinalsMatches match="1" stage="semi-final" game={match1Games} />
      <FinalsMatches match="2" stage="semi-final" game={match2Games} />
    </div>
  )
}

export default SemiFinalsContainerMobile
