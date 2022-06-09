import { db } from '../firebase'
import { collection, doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedSeason } from '../atoms/seasonAtoms'

interface SeasonList {
  idName: string
}
function useDivisionList() {
  const [list, setList] = useState<SeasonList[] | DocumentData[]>([])
  const season = useRecoilValue(selectedSeason)

  useEffect(() => {
    if (!season || season?.length === 0) {
      return
    } else {
      return onSnapshot(
        collection(db, 'Seasons', season!, 'Divisions'),
        (snapshot) => {
          setList(
            snapshot.docs.map((doc) => ({
              idName: doc.id,
            }))
          )
        }
      )
    }
  }, [db, season])

  return list
}

export default useDivisionList
