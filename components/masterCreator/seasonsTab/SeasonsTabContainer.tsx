import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import SeasonsDataContainer from '../commonComponents/seasonsData/SeasonsDataContainer'
import SeasonsTabsOptionsContainer from './SeasonsTabsOptionsContainer'

/**
 * Main Container for the seasons tab container.
 * Contains header of the title.
 * Container for the seasons tab options container
 */
function SeasonsTabContainer() {
  return (
    <div className="w-full text-black">
      <MasterCreatorHeader title="Seasons Editor" />
      <div className="my-5 rounded border-2 border-[#00838f] bg-[#cfd8dc] pb-14">
        <SeasonsTabsOptionsContainer />
        {/* <SeasonsDataContainer /> */}
      </div>
    </div>
  )
}

export default SeasonsTabContainer
