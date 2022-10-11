import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../atoms/seasonAtoms'
import { db } from '../firebase'
import { WeekScheduleList } from '../typings'

/**
 * Using current season and division selected from recoil states,
 * fetches all weeks schedules names
 * @returns array of week schedules inside the collection weeks-schedules
 */
function useWeeksSchedulesList() {
  const [list, setList] = useState<WeekScheduleList[] | DocumentData[]>([])
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  useEffect(() => {
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0
    ) {
      setList([])
    } else {
      return onSnapshot(
        collection(
          db,
          'Seasons',
          season!,
          'Divisions',
          division!,
          'Weeks-Schedules'
        ),
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

export default useWeeksSchedulesList
