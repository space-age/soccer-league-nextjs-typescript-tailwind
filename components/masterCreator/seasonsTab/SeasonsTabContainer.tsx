import { useState } from 'react'
import MasterCreatorHeader from '../commonComponents/MasterCreatorHeader'
import SeasonsDataContainer from '../commonComponents/seasonsData/SeasonsDataContainer'

function SeasonsTabContainer() {
  const [enteredSeasonName, setEnteredSeasonName] = useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    setEnteredSeasonName('')
  }

  return (
    <div className="w-full text-black ">
      <MasterCreatorHeader title="Seasons Editor" />

      <div className="my-5 rounded bg-[#cfd8dc] py-5 ">
        <div className="pl-4">
          <p className=" text-xl font-semibold">Add a season</p>
          <form onSubmit={handleSubmit} className="mt-1 text-lg">
            <label htmlFor="seasonName" className="pr-2 ">
              Season name:
            </label>
            <input
              type="text"
              id="seasonName"
              name="seasonName"
              value={enteredSeasonName}
              onChange={(e) => setEnteredSeasonName(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 rounded bg-[#00838f] px-1 text-white hover:bg-[white] hover:text-black"
            >
              Submit
            </button>
          </form>
        </div>
        <SeasonsDataContainer />
      </div>
    </div>
  )
}

export default SeasonsTabContainer
