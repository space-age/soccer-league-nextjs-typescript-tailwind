import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../../../../atoms/seasonAtoms'
import { db } from '../../../../firebase'
import SeasonDropdown from './SeasonDropdown'
import SeasonTable from './SeasonsTable'

function SeasonsDataContainer() {
  const divisions = [
    { id: '1', division: 'Division 1' },
    { id: '2', division: 'Division 2' },
  ]

  const [currentTab, setCurrentTab] = useState('1')

  const [checkDivision2, setCheckDivision2] = useState(false)
  const season = useRecoilValue(selectedSeason)

  const [division, setDivision] = useRecoilState(selectedDivision)

  /*
    When season is changed, will check if there is a Division 2,
    and if yes, will set the state to show a second tab for Division 2
  */
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'Seasons', season!, 'Divisions', 'DIVISION 2')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setCheckDivision2(true)
      } else {
        setCheckDivision2(false)
      }
    }
    fetchData()
  }, [season])

  const handlerTabButton = (e: any) => {
    setCurrentTab(e.target.id)
  }

  return (
    <div className="my-6">
      {/* <SeasonDropdown /> */}
      <div>
        <p className="bg-[#455a64] p-2 text-center text-xl font-semibold tracking-wider text-white">
          {season}
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
          {checkDivision2 && (
            <button
              onClick={handlerTabButton}
              id="2"
              className="w-[20%] rounded-br-lg rounded-bl-lg border-2 border-l-0 border-t-0 border-[#00838f] bg-[#eeeeee] p-2 hover:bg-[#cfd8dc]  disabled:bg-[#00838f] disabled:text-white"
              disabled={currentTab === `2`}
            >
              Division 2
            </button>
          )}
        </div>

        <div className={`${currentTab === '1' ? '' : 'hidden'}`}>
          <SeasonTable division={'DIVISION 1'} />
        </div>
        <div className={`${currentTab === '2' ? '' : 'hidden'}`}>
          <SeasonTable division={'DIVISION 2'} />
        </div>
      </div>
    </div>
  )
}

export default SeasonsDataContainer
