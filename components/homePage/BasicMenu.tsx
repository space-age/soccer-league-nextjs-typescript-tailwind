import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'

interface Props {
  isScrolled: boolean
}

export default function BasicMenu({ isScrolled }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(home: string) {
    setAnchorEl(null)
    router.push(`/${home}`)
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
          onClose={handleClose}
          className="menu "
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => handleClose('')}>Home</MenuItem>
          <MenuItem onClick={() => handleClose('schedules')}>
            Schedules
          </MenuItem>
          <MenuItem onClick={() => handleClose('table')}>Standings</MenuItem>
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
