import React, { useState } from 'react'
import FinalContainer from '../largerScreens/final/FinalContainer'
import QuarterFinalsContainer from '../largerScreens/quarterFinals/QuarterFinalsContainer'
import SemiFinalsContainer from '../largerScreens/semiFinals/SemiFinalsContainer'
import FinalContainerMobile from './final/FinalContainerMobile'
import QuarterFinalsContainerMobile from './quarterFinals/QuarterFinalsContainerMobile'
import SemiFinalsContainerMobile from './semiFinals/SemiFinalsContainerMobile'

function PlayoffContainerMobile() {
  const [stage, setStage] = useState('quarter')

  const handleButton = (selectedStage: string) => {
    setStage(selectedStage)
  }

  return (
    <div className="mt-5 text-black sm:!hidden">
      <div className="grid w-full grid-cols-3  bg-[#546e7a] text-white">
        <button
          onClick={() => handleButton('quarter')}
          className={`${
            stage === 'quarter' && 'bg-[#ced4da] text-black'
          } bg-[#37474f] p-3 text-base font-semibold`}
        >
          Quarter-Finals
        </button>
        <button
          onClick={() => handleButton('semi')}
          className={`${
            stage === 'semi' && 'bg-[#ced4da] text-black'
          } bg-[#455a64] p-3  text-base font-semibold`}
        >
          Semi-Finals
        </button>
        <button
          onClick={() => handleButton('final')}
          className={`${
            stage === 'final' && 'bg-[#ced4da] text-black'
          } bg-[#546e7a] p-3 text-base font-semibold `}
        >
          Final
        </button>
      </div>
      {stage === 'quarter' && <QuarterFinalsContainer />}
      {stage === 'semi' && <SemiFinalsContainer />}
      {stage === 'final' && <FinalContainer />}
    </div>
  )
}

export default PlayoffContainerMobile
