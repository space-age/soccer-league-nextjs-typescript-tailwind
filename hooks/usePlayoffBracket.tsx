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
import { PlayoffGame } from '../typings'

function usePlayoffBracket(stage = 'Finals') {
  const [list, setList] = useState<PlayoffGame[] | DocumentData[]>([])
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const bracket = useRecoilValue(selectedPlayoffBracket)

  useEffect(() => {
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0 ||
      !bracket ||
      bracket.idName.length === 0
    ) {
      return
    } else
      return onSnapshot(
        collection(
          db,
          'Seasons',
          season!,
          'Divisions',
          division!,
          'Playoffs-Brackets',
          bracket.idName!,
          'Stages'
        ),
        (snapshot) => {
          setList(
            snapshot.docs.map((doc) => ({
              idName: doc.id,
              ...doc.data(),
            }))
          )
        }
      )
  }, [db, season, division, bracket])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const docRef = doc(
  //       db,
  //       'Seasons',
  //       season!,
  //       'Divisions',
  //       division!,
  //       'Playoffs-Brackets',
  //       bracket.idName!,
  //       'Stages',
  //       stage
  //     )
  //     const docSnap = await getDoc(docRef)
  //     const data = docSnap.data()
  //     setList(data)
  //   }

  //   if (
  //     !season ||
  //     season?.length === 0 ||
  //     !division ||
  //     division?.length === 0 ||
  //     !bracket ||
  //     bracket.idName.length === 0
  //   ) {
  //     return
  //   }

  //   if (
  //     stage === 'Finals' ||
  //     stage === 'QuarterFinals' ||
  //     stage === 'SemiFinals'
  //   )
  //     fetchData()
  // }, [db, season, division, bracket])

  return list
}

export default usePlayoffBracket
