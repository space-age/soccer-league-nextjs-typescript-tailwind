import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../atoms/seasonAtoms'
import { db } from '../firebase'
import { PlayoffsBracket } from '../typings'

/**
 * Fetches all play off bracket from the selected season->division->playoffs-brackets
 * @returns array of all playoff brackets found in database
 */
function useBracketPlayoffList() {
  const [list, setList] = useState<PlayoffsBracket[] | DocumentData[]>([])
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  useEffect(() => {
    if (
      !season ||
      season?.length === 0 ||
      !division ||
      division?.length === 0
    ) {
      setList([])
    } else {
      return onSnapshot(
        collection(
          db,
          'Seasons',
          season!,
          'Divisions',
          division!,
          'Playoffs-Brackets'
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
    }
  }, [db, season, division])

  return list
}

export default useBracketPlayoffList
