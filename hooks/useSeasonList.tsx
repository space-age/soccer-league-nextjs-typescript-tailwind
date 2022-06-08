import { db } from '../firebase'
import { collection, doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface SeasonList {
  idName: string
}
function useSeasonList() {
  const [list, setList] = useState<SeasonList[] | DocumentData[]>([])

  // const snapshot = await db.collection('Seasons').get()
  // return snapshot.docs.map(doc => doc.data());

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
