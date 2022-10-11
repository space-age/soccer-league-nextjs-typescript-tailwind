import { db } from '../firebase'
import { collection, doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface SeasonList {
  idName: string
}

/**
 * Fetches all document names inside the Collection "Seasons"
 * @returns an array of the names inside the collection "Seasons"
 */
function useSeasonList() {
  const [list, setList] = useState<SeasonList[] | DocumentData[]>([])

  /**
   * If any changes in the database,
   * loops thru the snapshot of the collection "Seasons"
   * sets the state to an array of all the document names inside the collection
   */
  useEffect(() => {
    return onSnapshot(collection(db, 'Seasons'), (snapshot) => {
      setList(
        snapshot.docs.map((doc) => ({
          idName: doc.id,
        }))
      )
    })
  }, [db])

  return list
}

export default useSeasonList
