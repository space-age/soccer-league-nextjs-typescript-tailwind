import { useRecoilValue } from 'recoil'
import { selectedSeason } from '../../../atoms/seasonAtoms'
import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import SeasonsDataContainer from '../commonComponents/seasonsData/SeasonsDataContainer'
import TeamsTabsOptionsContainer from './TeamsTabsOptionsContainer'

/**
 * Main Container for the teams tab container.
 * Contains header of the title.
 * Container for the teams tab options container
 */
function TeamsTabContainer() {
  const season = useRecoilValue(selectedSeason)

  return (
    <div className="w-full text-black">
      <MasterCreatorHeader title="Teams Editor" />
      <div className="my-5 rounded border-2 border-[#00838f] bg-[#cfd8dc]">
        <TeamsTabsOptionsContainer />
        {/* If season has been selected, then display a table of all teams within the season and division */}
        {!(!season || season?.length === 0) && <SeasonsDataContainer />}
      </div>
    </div>
  )
}

export default TeamsTabContainer
