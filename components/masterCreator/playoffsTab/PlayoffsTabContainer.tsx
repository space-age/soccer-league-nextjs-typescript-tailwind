import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import PlayoffsTabsOptionsContainer from './PlayoffsTabsOptionsContainer'

function PlayoffsTabContainer() {
  return (
    <div className="w-full text-black">
      <MasterCreatorHeader title="Playoffs Editor" />
      <div className="my-5 rounded border-2 border-[#00838f] bg-[#cfd8dc]">
        <PlayoffsTabsOptionsContainer />
      </div>
    </div>
  )
}

export default PlayoffsTabContainer
