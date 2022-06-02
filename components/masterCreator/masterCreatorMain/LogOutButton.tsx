import useAuth from '../../../hooks/useAuth'

import LogoutIcon from '@mui/icons-material/Logout'
import { Button } from '@mui/material'

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
  return (
    <div>
      {!hide ? (
        <LogoutIcon
          onClick={logout}
          className={`!absolute !right-8 !bottom-10 cursor-pointer !text-2xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]`}
        />
      ) : (
        <Button
          onClick={logout}
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
