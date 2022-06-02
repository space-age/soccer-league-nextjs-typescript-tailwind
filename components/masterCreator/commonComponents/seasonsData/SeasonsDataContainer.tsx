import { useState } from 'react'
import SeasonDropdown from './SeasonDropdown'
import SeasonTable from './SeasonsTable'

function SeasonsDataContainer() {
  const divisions = [
    { id: '1', division: 'Division 1' },
    { id: '2', division: 'Division 2' },
  ]

  const [currentTab, setCurrentTab] = useState('1')

  const handlerTabButton = (e: any) => {
    setCurrentTab(e.target.id)
  }

  return (
    <div>
      <SeasonDropdown />
      <div>
        <p className="bg-[#455a64] p-2 text-center text-xl font-semibold tracking-wider text-white">
          Season 1 (2022 / 05 - 2022 / 09)
        </p>
        <div className="flex  text-lg ">
          <button
            onClick={handlerTabButton}
            id="1"
            className={`w-[20%] rounded-bl-lg
             rounded-br-lg border-2 border-l-0 border-t-0 border-[#00838f] bg-[#eeeeee]  p-2 tracking-wider hover:bg-[#cfd8dc]  disabled:bg-[#00838f] disabled:text-white`}
            disabled={currentTab === `1`}
          >
            Division 1
          </button>
          <button
            onClick={handlerTabButton}
            id="2"
            className="w-[20%] rounded-br-lg rounded-bl-lg border-2 border-l-0 border-t-0 border-[#00838f] bg-[#eeeeee] p-2 hover:bg-[#cfd8dc]  disabled:bg-[#00838f] disabled:text-white"
            disabled={currentTab === `2`}
          >
            Division 2
          </button>
        </div>

        <div className={`${currentTab === '1' ? '' : 'hidden'}`}>
          <SeasonTable />
        </div>
        <div className={`${currentTab === '2' ? '' : 'hidden'}`}>
          hello world
        </div>
      </div>
    </div>
  )
}

export default SeasonsDataContainer
