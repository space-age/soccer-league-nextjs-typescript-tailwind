import React from 'react'
import usePlayoffBracket from '../../../../hooks/usePlayoffBracket'
import FinalsMatches from '../../largerScreens/FinalsMatches'

function FinalContainerMobile() {
  const selectedPlayoffBracket = usePlayoffBracket()

  const finalBracket = selectedPlayoffBracket.find(
    (bracket) => bracket.idName === 'Finals'
  )

  const final = [finalBracket?.final]

  return (
    <div>
      <div className="mt-5 bg-[#546e7a] p-3">
        <h2 className="text-center text-2xl font-semibold text-white  ">
          Final
        </h2>
      </div>
      <FinalsMatches match="1" stage="final" game={final} />
    </div>
  )
}

export default FinalContainerMobile
