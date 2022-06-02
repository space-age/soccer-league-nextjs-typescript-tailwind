import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import SeasonsDataContainer from '../commonComponents/seasonsData/SeasonsDataContainer'
import SeasonsTabsOptionsContainer from './SeasonsTabsOptionsContainer'

function SeasonsTabContainer() {
  return (
    <div className="w-full text-black ">
      <MasterCreatorHeader title="Seasons Editor" />
      <div className="my-5 rounded bg-[#cfd8dc] ">
        <SeasonsTabsOptionsContainer />
        <SeasonsDataContainer />
      </div>
    </div>
  )
}

export default SeasonsTabContainer
