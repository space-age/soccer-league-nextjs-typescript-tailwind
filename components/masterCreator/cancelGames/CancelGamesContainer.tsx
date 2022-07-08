import React from 'react'
import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import CancelGamesForm from './CancelGamesForm'

function CancelGamesContainer() {
  return (
    <div className="w-full text-black">
      <MasterCreatorHeader title="Cancel Games" />

      <div className="my-5 rounded border-2 border-[#00838f] bg-[#cfd8dc] pb-14">
        <CancelGamesForm />
      </div>
    </div>
  )
}

export default CancelGamesContainer
