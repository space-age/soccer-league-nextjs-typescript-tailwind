import { db } from '../firebase'
import { collection, doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../atoms/seasonAtoms'
import { TeamList } from '../typings'

function useTeamList(div = '') {
  const [list, setList] = useState<TeamList[] | DocumentData[]>([])
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  useEffect(() => {
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
