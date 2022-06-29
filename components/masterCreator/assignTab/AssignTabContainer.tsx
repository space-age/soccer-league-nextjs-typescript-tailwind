import React from 'react'
import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import AssignTabsOptionsContainer from './AssignTabsOptionsContainer'

function AssignTabContainer() {
  return (
    <div className="w-full text-black">
      <MasterCreatorHeader title="Assign Current Season and Week Schedule" />

      <div className="my-5 rounded border-2 border-[#00838f] bg-[#cfd8dc] pb-14">
        <AssignTabsOptionsContainer />
      </div>
    </div>
  )
}

export default AssignTabContainer
