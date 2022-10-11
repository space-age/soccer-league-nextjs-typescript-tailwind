import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../atoms/seasonAtoms'
import { db } from '../firebase'
import { ScheduleList } from '../typings'

/**
 * Using the current selected season->divison->week schedule
 * fetch the lists of all schedules
 * @returns array of all schedules within selected season->divison->week schedule
 */
function useSchedulesList() {
  const [list, setList] = useState<ScheduleList[] | DocumentData[]>([])
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const weekSchedule = useRecoilValue(selectedScheduleWeek)

  useEffect(() => {
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0 ||
      !weekSchedule ||
      weekSchedule.idName.length === 0
    ) {
      setList([])
      return
    } else {
      return onSnapshot(
        collection(
          db,
          'Seasons',
          season!,
          'Divisions',
          division!,
          'Weeks-Schedules',
          weekSchedule.idName,
          'Schedules'
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
  }, [db, season, division, weekSchedule])

  return list
}

export default useSchedulesList
