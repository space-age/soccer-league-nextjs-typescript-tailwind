import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../atoms/seasonAtoms'
import { db } from '../firebase'
import { FieldsList } from '../typings'

function useFieldNumberList() {
  const [list, setList] = useState<FieldsList[] | DocumentData>([])

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'More', 'Fields')
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()
      const fields = data?.fields
      console.log(data)
      console.log(fields)

      setList(fields)
    }

    fetchData()

    // return onSnapshot(collection(db, 'More', 'Fields'), (snapshot) => {
    //   setList(
    //     snapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //     }))
    //   )
    // })
  }, [db])

  return list
}

export default useFieldNumberList
