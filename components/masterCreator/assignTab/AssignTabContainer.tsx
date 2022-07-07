import React from 'react'
import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import AssignTabsOptionsContainer from './AssignTabsOptionsContainer'

function AssignTabContainer() {
  return (
    <div className="w-full text-black">
      <MasterCreatorHeader title="Assign Week Schedule or Playoff Bracket with Season and Division" />

      <div className="my-5 rounded border-2 border-[#00838f] bg-[#cfd8dc] pb-14">
        <AssignTabsOptionsContainer />
      </div>
    </div>
  )
}

export default AssignTabContainer
