import React from 'react'
import usePlayoffBracket from '../../../../hooks/usePlayoffBracket'
import FinalsMatches from '../FinalsMatches'

function FinalContainer() {
  const selectedPlayoffBracket = usePlayoffBracket()

  const finalBracket = selectedPlayoffBracket.find(
    (bracket) => bracket.idName === 'Finals'
  )

  const final = [finalBracket?.final]

  return (
    <div className="sm:bg-[#fafafa]">
      <div className="mt-5 bg-[#546e7a] p-3 sm:mt-0">
        <h2 className="text-center text-2xl font-semibold text-white md:text-3xl ">
          Final
        </h2>
      </div>
      <FinalsMatches match="1" stage="final" game={final} />
    </div>
  )
}

export default FinalContainer
