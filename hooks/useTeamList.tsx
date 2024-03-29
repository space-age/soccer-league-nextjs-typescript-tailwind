import { db } from '../firebase'
import { collection, doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../atoms/seasonAtoms'
import { TeamList } from '../typings'

/**
 * Fetches from Teams collection, and gets all documents, all teams.
 * @param div
 * @returns array of all teams inside the selected season->division->teams
 */
function useTeamList(div = '') {
  const [list, setList] = useState<TeamList[] | DocumentData[]>([])
  const season = useRecoilValue(selectedSeason) //current season selected
  const division = useRecoilValue(selectedDivision) //current division selected

  useEffect(() => {
    if (!season || season?.length === 0) {
      setList([])
    }
    if (
      (!season ||
        season?.length === 0 ||
        !division ||
        division?.length === 0) &&
      (!div || div?.length === 0)
    ) {
      return
    } else {
      if (!div || div?.length === 0) {
        return onSnapshot(
          collection(db, 'Seasons', season!, 'Divisions', division!, 'Teams'),
          (snapshot) => {
            setList(
              snapshot.docs.map((doc) => ({
                idName: doc.id,
                ...doc.data(),
              }))
            )
          }
        )
      } else {
        return onSnapshot(
          collection(db, 'Seasons', season!, 'Divisions', div!, 'Teams'),
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
    }
  }, [db, season, division])

  return list
}

export default useTeamList
