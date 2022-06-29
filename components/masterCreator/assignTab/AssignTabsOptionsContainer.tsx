import { useState } from 'react'
import AssignSeasonPlusWeekContainer from './assignSeasonPlusWeek/AssignSeasonPlusWeekContainer'

function AssignTabsOptionsContainer() {
  const Tabs = [{ id: '1', name: 'Assign Season and Schedule Week' }]

  const [currentTab, setCurrentTab] = useState(Tabs[0].id)

  const handlerTabButton = (e: any) => {
    setCurrentTab(e.target.id)
  }

  return (
    <div className="">
      <div>
        <div className="bg-[#455a64] p-2"></div>
        <div className="flex  text-lg ">
          {Tabs.map((tab, index) => (
            <button
              key={index}
              onClick={handlerTabButton}
              id={tab.id}
              className={`w-[30%] rounded-bl-lg
             rounded-br-lg border-2 border-l-0 border-t-0 border-[#00838f] bg-[#eeeeee]  p-2 tracking-wider hover:bg-[#cfd8dc]  disabled:bg-[#00838f] disabled:text-white`}
              disabled={currentTab === tab.id}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className={`${currentTab === '1' ? '' : 'hidden'} mx-3 mt-6`}>
          <AssignSeasonPlusWeekContainer />
        </div>
      </div>
    </div>
  )
}

export default AssignTabsOptionsContainer
