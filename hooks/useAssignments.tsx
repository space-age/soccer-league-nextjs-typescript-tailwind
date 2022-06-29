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
import { Assignments } from '../typings'

function useAssignments() {
  const [list, setList] = useState<Assignments | DocumentData>()

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
