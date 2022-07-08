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

function useGameCancel() {
  const [list, setList] = useState<GameCancel | DocumentData>()

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
