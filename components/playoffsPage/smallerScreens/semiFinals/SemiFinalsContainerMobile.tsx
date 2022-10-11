import React from 'react'
import usePlayoffBracket from '../../../../hooks/usePlayoffBracket'
import FinalsMatches from '../../largerScreens/FinalsMatches'

/**
 * From the stages in play off bracket, finds the document with name SemiFinals
 * Creates the matches for the bracket
 * @returns matches for the semi final bracket
 */
function SemiFinalsContainerMobile() {
  const selectedPlayoffBracket = usePlayoffBracket()

  const semiFinalsBracket = selectedPlayoffBracket.find(
    (bracket) => bracket.idName === 'SemiFinals'
  )

  /**
   * Creating the matches for semi final bracket
   */
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
