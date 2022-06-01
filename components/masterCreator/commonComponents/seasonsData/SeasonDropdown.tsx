import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

export default function SeasonDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <div className="my-6 flex w-full items-center justify-center ">
      <div className=" rounded-md border-2 border-[#00838f]">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className=" bg-[#eeeeee] !text-black"
        >
          <h2 className="text-md font-semibold text-black sm:text-lg">
            Match Week 1
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </h2>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          className="menu h-[40%]  sm:h-[50%]"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 1
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 2
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 3
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 4
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 5
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 6
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 7
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 8
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 9
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 10
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 11
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 12
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 13
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 14
          </MenuItem>
          <MenuItem
            className="hover:bg-[#cfd8dc]"
            onClick={() => handleClose()}
          >
            Week 15
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
