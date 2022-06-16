import React, { useState } from 'react'
import CreateWeekSchedule from './createWeekSchedule/CreateWeekSchedule'

function SchedulesTabsOptionsContainer() {
  const Tabs = [
    { id: '1', name: 'Create Week Schedule' },
    { id: '2', name: 'Add a Schedule' },
    { id: '3', name: 'Modify Schedule' },
    { id: '4', name: 'Record Week Scores' },
  ]

  const [currentTab, setCurrentTab] = useState(Tabs[0].id)

  // const [season, setSeason] = useRecoilState(selectedSeason)
  // const [division, setDivision] = useRecoilState(selectedDivision)
  // const [team, setTeam] = useRecoilState(selectedTeam)

  // const resetSeason = useResetRecoilState(selectedSeason)
  // const resetDivision = useResetRecoilState(selectedDivision)
  // const resetTeam = useResetRecoilState(selectedTeam)

  const handlerTabButton = (e: any) => {
    // setSeason('') //will restart the season in dropdown selection in all app
    // setDivision('') //will restart the division in dropdown selection in all app
    // setTeam('') //RESTARTS THE DROPDOWN MENU
    // resetSeason()
    // resetDivision()
    // resetTeam()
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
              className={`w-[20%] rounded-bl-lg
             rounded-br-lg border-2 border-l-0 border-t-0 border-[#00838f] bg-[#eeeeee]  p-2 tracking-wider hover:bg-[#cfd8dc]  disabled:bg-[#00838f] disabled:text-white`}
              disabled={currentTab === tab.id}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className={`${currentTab === '1' ? '' : 'hidden'} mx-3 mt-3`}>
          <CreateWeekSchedule />
        </div>
        <div className={`${currentTab === '2' ? '' : 'hidden'} mx-3 mt-3 `}>
          {/* Add a Schedule*/}
        </div>
        <div className={`${currentTab === '3' ? '' : 'hidden'} mx-3 mt-3 `}>
          {/* Modify Schedule */}
        </div>
        <div className={`${currentTab === '4' ? '' : 'hidden'} mx-3 mt-3 `}>
          {/* Record Week Scores */}
        </div>
      </div>
    </div>
  )
}

export default SchedulesTabsOptionsContainer
