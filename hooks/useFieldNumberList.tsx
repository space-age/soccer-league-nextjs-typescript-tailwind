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
      setList(fields)
    }
    fetchData()
  }, [db])

  return list
}

export default useFieldNumberList
