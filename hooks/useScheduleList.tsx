import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../atoms/seasonAtoms'
import { db } from '../firebase'
import { TeamList } from '../typings'

function useScheduleList() {
  const [list, setList] = useState<TeamList[] | DocumentData[]>([])
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  useEffect(() => {
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0
    ) {
      return
    } else {
      return onSnapshot(
        collection(db, 'Seasons', season!, 'Divisions', division!, 'Schedules'),
        (snapshot) => {
          setList(
            snapshot.docs.map((doc) => ({
              idName: doc.id,
              ...doc.data(),
            }))
          )
        }
      )
    }
  }, [db, season, division])

  return list
}

export default useScheduleList
