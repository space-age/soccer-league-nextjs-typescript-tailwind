import React, { useState } from 'react'
import CreateWeekSchedule from './createWeekScheduleTab/CreateWeekSchedule'
import DeleteWeekScheduleContainer from './deleteWeekScheduleTab/DeleteWeekScheduleContainer'
import EditScheduleContainer from './editScheduleTab/EditScheduleContainer'
import RecordWeekScoresContainer from './recordWeekScoresTab/RecordWeekScoresContainer'
// import AddSchedule from './addScheduleTab/AddSchedule'
import { v4 as uuidv4 } from 'uuid'
import PushWeekScheduleContainer from './pushWeekSchedule/PushWeekScheduleContainer'

function SchedulesTabsOptionsContainer() {
  const Tabs = [
    { id: '1', name: 'Create Week Schedule' },
    { id: '2', name: 'Delete Week Schedule' },
    { id: '3', name: 'Add / Edit Schedules' },
    { id: '4', name: 'Record Week Scores' },
    { id: '5', name: 'Push Week Schedule' },

    // { id: '2', name: 'Add a Schedule' }, // kept just incase want to enable
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
          <CreateWeekSchedule />
        </div>
        <div className={`${currentTab === '2' ? '' : 'hidden'} mx-3 mt-3 `}>
          <DeleteWeekScheduleContainer />
        </div>
        <div className={`${currentTab === '3' ? '' : 'hidden'} mx-3 mt-3 `}>
          <EditScheduleContainer />
        </div>
        <div className={`${currentTab === '4' ? '' : 'hidden'} mx-3 mt-3 `}>
          <RecordWeekScoresContainer />
        </div>
        <div className={`${currentTab === '5' ? '' : 'hidden'} mx-3 mt-3 `}>
          <PushWeekScheduleContainer />
        </div>
        {/* Tab below has the capability of adding schedules and only displaying the list of schedules without editing capability */}
        {/* <div className={`${currentTab === '2' ? '' : 'hidden'} mx-3 mt-3 `}>
          <AddSchedule />
        </div> */}
      </div>
    </div>
  )
}

export default SchedulesTabsOptionsContainer
