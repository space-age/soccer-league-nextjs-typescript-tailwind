import React from 'react'
import FinalContainer from './final/FinalContainer'
import QuarterFinalsContainer from './quarterFinals/QuarterFinalsContainer'
import SemiFinalsContainer from './semiFinals/SemiFinalsContainer'

/**
 * Container for playoff bracket for larger than smaller screens, width: 640px or higher
 * Contains 3 containers for the stages of playoff brackets: quarter-finals, semi-finals, and final
 * @returns the 3 containers for the stages of playoff brackets
 */
function PlayoffContainer() {
  return (
    <div className="mt-3  hidden grid-cols-3 gap-[0.1rem]  text-[#212121] shadow-xl sm:mt-7 sm:grid md:m-7">
      <QuarterFinalsContainer />
      <SemiFinalsContainer />
      <FinalContainer />
    </div>
  )
}

export default PlayoffContainer
