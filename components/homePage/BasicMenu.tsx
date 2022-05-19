import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
          <MenuIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="menu "
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Home</MenuItem>
          <MenuItem onClick={handleClose}>Schedules</MenuItem>
          <MenuItem onClick={handleClose}>Standings</MenuItem>
          <MenuItem onClick={handleClose}>Field Location</MenuItem>
          <MenuItem onClick={handleClose}>Contact Us</MenuItem>
        </Menu>
      </div>
      <h1 className="text-xl font-semibold text-black">Adult Soccer League</h1>
    </div>
  )
}
