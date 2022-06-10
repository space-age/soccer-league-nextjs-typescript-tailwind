import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { selectedDivision, selectedSeason } from '../../../atoms/seasonAtoms'
import AddTeam from './addTeamTab/AddTeam'
import DeleteTeam from './deleteTeamTab/DeleteTeam'

function TeamsTabsOptionsContainer() {
  const Tabs = [
    { id: '1', name: 'Add a Team' },
    { id: '2', name: 'Delete a Team' },
  ]

  const [currentTab, setCurrentTab] = useState(Tabs[0].id)

  const [season, setSeason] = useRecoilState(selectedSeason)
  const [division, setDivision] = useRecoilState(selectedDivision)

  const handlerTabButton = (e: any) => {
    setSeason('') //will restart the season in dropdown selection in all app
    setDivision('') //will restart the division in dropdown selection in all app
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
          <AddTeam />
        </div>
        <div className={`${currentTab === '2' ? '' : 'hidden'} mx-3 mt-3 `}>
          <DeleteTeam />
        </div>
      </div>
    </div>
  )
}

export default TeamsTabsOptionsContainer