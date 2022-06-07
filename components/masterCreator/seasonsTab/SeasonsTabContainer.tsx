import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import SeasonsDataContainer from '../commonComponents/seasonsData/SeasonsDataContainer'
import SeasonsTabsOptionsContainer from './SeasonsTabsOptionsContainer'
import ShowAddSeasonModal from './ShowAddSeasonModal'

import { useRecoilValue } from 'recoil'
import { modalState } from '../../../atoms/modalAtoms'

function SeasonsTabContainer() {
  const showModal = useRecoilValue(modalState)

  return (
    <div className="w-full text-black">
      <MasterCreatorHeader title="Seasons Editor" />
      <div className="my-5 rounded border-2 border-[#00838f] bg-[#cfd8dc]">
        <SeasonsTabsOptionsContainer />
        <SeasonsDataContainer />
      </div>
      {showModal && <ShowAddSeasonModal />}
    </div>
  )
}

export default SeasonsTabContainer
