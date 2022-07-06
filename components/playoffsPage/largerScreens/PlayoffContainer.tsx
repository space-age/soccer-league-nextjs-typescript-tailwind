import React from 'react'
import FinalContainer from './final/FinalContainer'
import QuarterFinalsContainer from './quarterFinals/QuarterFinalsContainer'
import SemiFinalsContainer from './semiFinals/SemiFinalsContainer'

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
