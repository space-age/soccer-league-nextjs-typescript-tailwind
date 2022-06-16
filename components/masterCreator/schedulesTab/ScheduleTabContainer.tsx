import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import SchedulesTabsOptionsContainer from './SchedulesTabsOptionsContainer'

function ScheduleTabContainer() {
  return (
    <div className="w-full text-black">
      <MasterCreatorHeader title="Schedule Editor" />
      <div className="my-5 rounded border-2 border-[#00838f] bg-[#cfd8dc]">
        <SchedulesTabsOptionsContainer />
      </div>
    </div>
  )
}

export default ScheduleTabContainer
