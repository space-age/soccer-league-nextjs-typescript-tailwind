import useAuth from '../../../hooks/useAuth'

import LogoutIcon from '@mui/icons-material/Logout'
import { Button } from '@mui/material'
import { useResetRecoilState } from 'recoil'
import {
  selectedDivision,
  selectedSeason,
  selectedTeam,
} from '../../../atoms/seasonAtoms'

interface Props {
  hide: boolean
}

/*
  Returns a Logout button,
    when clicked, it will log out the user and re-direct to the login page
*/
function LogOutButton(props: Props) {
  const { hide } = props
  const { logout } = useAuth()

  const resetSeason = useResetRecoilState(selectedSeason)
  const resetDivision = useResetRecoilState(selectedDivision)
  const resetTeam = useResetRecoilState(selectedTeam)

  const handleLogout = () => {
    logout()
    resetSeason()
    resetDivision()
    resetTeam()
  }
  return (
    <div>
      {!hide ? (
        <LogoutIcon
          onClick={handleLogout}
          className={`!absolute !right-8 !bottom-10 cursor-pointer !text-2xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]`}
        />
      ) : (
        <Button
          onClick={handleLogout}
          className={`!absolute !bottom-0 !right-5 !text-3xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]`}
        >
          {/* <LogoutIcon /> */}
          Log out
        </Button>
      )}
    </div>
  )
}

export default LogOutButton
