import React from 'react'
import usePlayoffBracket from '../../../../hooks/usePlayoffBracket'
import FinalsMatches from '../FinalsMatches'

/**
 * From the stages in play off bracket, finds the document with name SemiFinals
 * Creates the matches for the bracket
 * @returns matches for the semi final bracket
 */
function SemiFinalsContainer() {
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
    <div className="sm:bg-[#f5f5f5]">
      <div className="mt-5 bg-[#455a64] p-3 sm:mt-0">
        <h2 className=" text-center text-2xl font-semibold text-white md:text-3xl ">
          Semi-Finals
        </h2>
      </div>
      <FinalsMatches match="1" stage="semi-final" game={match1Games} />
      <FinalsMatches match="2" stage="semi-final" game={match2Games} />
    </div>
  )
}

export default SemiFinalsContainer
