import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedPlayoffBracket,
  selectedSeason,
} from '../atoms/seasonAtoms'
import { db } from '../firebase'
import { Assignments } from '../typings'

function useQuarterFinals() {
  const [list, setList] = useState<Assignments | DocumentData>()
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const bracket = useRecoilValue(selectedPlayoffBracket)

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(
        db,
        'Seasons',
        season!,
        'Divisions',
        division!,
        'Playoffs-Brackets',
        bracket.idName!,
        'Stages',
        'QuarterFinals'
      )
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()
      setList(data)
    }
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0 ||
      !bracket ||
      bracket.idName.length === 0
    ) {
      return
    } else {
      fetchData()
    }
  }, [db, season, division, bracket])

  return list
}

export default useQuarterFinals
