import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'

interface Props {
  isScrolled: boolean
}

/**
 * Basic Menu for smaller screen size such as phones (width:640px or less)
 * Displays options for links to different pages in the application
 * @param isScrolled {Props}
 * @returns menu items for links to different pages in the application
 */
export default function BasicMenu({ isScrolled }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  /**
   * Handler for when user clicks the button with MenuIcon
   * Sets the state anchorEl to the current event target
   * @param event {React.MouseEvent<HTMLButtonElement>}
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  /**
   * Handler to determine the router push page, depending on the page parameter
   * @param page {string}
   */
  function handleClose(page: string) {
    setAnchorEl(null)
    if (page !== 'null') router.push(`/${page}`)
  }

  return (
    <div className="flex w-full items-center justify-start  sm:!hidden">
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className=" !text-black"
        >
          <MenuIcon className={`${isScrolled && 'text-white'}`} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose('null')}
          className="menu "
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => handleClose('')}>Home</MenuItem>
          <MenuItem onClick={() => handleClose('schedules')}>
            Schedules
          </MenuItem>
          <MenuItem onClick={() => handleClose('table')}>Tables</MenuItem>
          {/* Teams page is not available yet */}
          {/* <MenuItem onClick={() => handleClose('teams')}>Teams</MenuItem> */}
          <MenuItem onClick={() => handleClose('playoffs')}>Playoffs</MenuItem>
          <MenuItem onClick={() => handleClose('fields')}>
            Field Location
          </MenuItem>
          <MenuItem onClick={() => handleClose('contact')}>Contact Us</MenuItem>
        </Menu>
      </div>
      <h1 className={`${!isScrolled && 'text-black'} text-xl font-semibold`}>
        Adult Soccer League
      </h1>
    </div>
  )
}
