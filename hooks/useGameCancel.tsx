import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { GameCancel } from '../typings'

/**
 * Fetches data from the database and document reference "Game Cancel"
 *
 * @returns the data fetched from db document "Game Cancel"
 */

function useGameCancel() {
  const [list, setList] = useState<GameCancel | DocumentData>()

  /**
   * If any changes to the database,
   * Calls the function fecthData to get document reference "Game Cancel"
   * Gets snapshot of the document data
   * Sets the data to the State
   */
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'More', 'Game Cancel')
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()
      setList(data)
    }
    fetchData()
  }, [db])

  return list
}

export default useGameCancel
