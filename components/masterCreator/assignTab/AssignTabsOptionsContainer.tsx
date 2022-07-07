import { useState } from 'react'
import AssignPlayoffBracketContainer from './assignPlayoffBracket/AssignPlayoffBracketContainer'
import AssignSeasonPlusWeekContainer from './assignSeasonPlusWeek/AssignSeasonPlusWeekContainer'
import { v4 as uuidv4 } from 'uuid'

function AssignTabsOptionsContainer() {
  const Tabs = [
    { id: '1', name: 'Assign Season and Schedule Week' },
    { id: '2', name: 'Assign Season and Playoff Bracket' },
  ]

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
              key={uuidv4()}
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
        <div className={`${currentTab === '2' ? '' : 'hidden'} mx-3 mt-6`}>
          <AssignPlayoffBracketContainer />
        </div>
      </div>
    </div>
  )
}

export default AssignTabsOptionsContainer
