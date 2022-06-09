import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import SeasonsDataContainer from '../commonComponents/seasonsData/SeasonsDataContainer'
import TeamsTabsOptionsContainer from './TeamsTabsOptionsContainer'

function TeamsTabContainer() {
  return (
    <div className="w-full text-black">
      <MasterCreatorHeader title="Teams Editor" />
      <div className="my-5 rounded border-2 border-[#00838f] bg-[#cfd8dc]">
        <TeamsTabsOptionsContainer />
        <SeasonsDataContainer />
      </div>
    </div>
  )
}

export default TeamsTabContainer
