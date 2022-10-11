import { db } from '../firebase'
import { collection, doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedSeason } from '../atoms/seasonAtoms'

interface SeasonList {
  idName: string
}

/**
 * Using current season selected:
 * Fetches the documents id(name) inside the collection "Divisions"
 * @returns array of the documents id(name)
 */
function useDivisionList() {
  const [list, setList] = useState<SeasonList[] | DocumentData[]>([])
  const season = useRecoilValue(selectedSeason) //current season selected

  /**
   * Sets the state list to an array of the documents inside current season and collection "Divisions"
   */
  useEffect(() => {
    if (!season || season?.length === 0) {
      setList([])
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
