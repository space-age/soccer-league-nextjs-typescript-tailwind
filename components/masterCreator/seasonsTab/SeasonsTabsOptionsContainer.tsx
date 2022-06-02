import { useState } from 'react'
import AddSeason from './AddSeason'
import DeleteSeason from './DeleteSeason'

function SeasonsTabsOptionsContainer() {
  const [enteredSeasonName, setEnteredSeasonName] = useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    setEnteredSeasonName('')
  }

  const Tabs = [
    { id: '1', name: 'Add a Season' },
    { id: '2', name: 'Delete a Season' },
  ]

  const [currentTab, setCurrentTab] = useState(Tabs[0].id)

  const handlerTabButton = (e: any) => {
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

        <div className={`${currentTab === '1' ? '' : 'hidden'} mt-3 ml-3`}>
          <AddSeason />
        </div>
        <div className={`${currentTab === '2' ? '' : 'hidden'} mt-3 ml-3 `}>
          <DeleteSeason />
        </div>
      </div>
    </div>
  )
}

export default SeasonsTabsOptionsContainer
