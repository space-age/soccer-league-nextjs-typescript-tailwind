import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { Assignments } from '../typings'

/**
 * Fetches data in db inside document "Assignments"
 * @returns the data inisde the document "Assignments"
 */
function useAssignments() {
  const [list, setList] = useState<Assignments | DocumentData>()

  /**
   * If any changes in the database
   * Then call the function fecthData() to get the data inside document "Assignments"
   */
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'More', 'Assignments')
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()
      setList(data)
    }
    fetchData()
  }, [db])

  return list
}

export default useAssignments
