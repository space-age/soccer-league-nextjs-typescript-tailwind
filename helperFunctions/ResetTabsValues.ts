import { useRecoilState } from 'recoil'
import {
  selectedDivision,
  selectedSeason,
  selectedTeam,
} from '../atoms/seasonAtoms'

const ResetTabsValues = () => {
  const [season, setSeason] = useRecoilState(selectedSeason)
  const [division, setDivision] = useRecoilState(selectedDivision)
  const [team, setTeam] = useRecoilState(selectedTeam)

  setDivision('') //will restart the division in dropdown selection in all app
  setTeam('') //will restart the teams in dropdown selection in all app
  setSeason('') //will restart the season in dropdown selection in all app
}

export default ResetTabsValues
