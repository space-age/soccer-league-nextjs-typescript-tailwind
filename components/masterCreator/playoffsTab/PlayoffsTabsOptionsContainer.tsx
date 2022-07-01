import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CreatePlayoffsBracketContainer from './createPlayoffsBracketTab/CreatePlayoffsBracketContainer'

function PlayoffsTabsOptionsContainer() {
  const Tabs = [
    { id: '1', name: 'Create Playoffs Bracket' },
    { id: '2', name: 'Edit Playoffs Bracket' },
    { id: '3', name: 'Delete Playoffs Bracket' },
    { id: '4', name: 'Publish Playoffs Bracket' },
  ]

  const [currentTab, setCurrentTab] = useState(Tabs[0].id)

  const handlerTabButton = (e: any) => {
    setCurrentTab(e.target.id)
  }

  return (
    <div>
      <div>
        <div className="bg-[#455a64] p-2"></div>
        <div className="flex  text-lg ">
          {Tabs.map((tab, index) => (
            <button
              key={uuidv4()}
              onClick={handlerTabButton}
              id={tab.id}
              className={`w-[20%] rounded-bl-lg
             rounded-br-lg border-2 border-l-0 border-t-0 border-[#00838f] bg-[#eeeeee]  p-2 tracking-wider hover:bg-[#cfd8dc]  disabled:bg-[#00838f] disabled:text-white`}
              disabled={currentTab === tab.id}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className={`${currentTab === '1' ? '' : 'hidden'} mx-3 mt-3`}>
          <CreatePlayoffsBracketContainer />
        </div>
        <div
          className={`${currentTab === '2' ? '' : 'hidden'} mx-3 mt-3 `}
        ></div>
        <div
          className={`${currentTab === '3' ? '' : 'hidden'} mx-3 mt-3 `}
        ></div>
        <div
          className={`${currentTab === '4' ? '' : 'hidden'} mx-3 mt-3 `}
        ></div>
      </div>
    </div>
  )
}

export default PlayoffsTabsOptionsContainer
