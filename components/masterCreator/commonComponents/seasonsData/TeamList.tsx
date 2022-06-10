import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

import { selectedTeam } from '../../../../atoms/seasonAtoms'
import { useRecoilState } from 'recoil'
import useTeamList from '../../../../hooks/useTeamList'

export default function TeamList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [teamSelected, setTeamSelected] = useRecoilState(selectedTeam)

  const seasonList = useTeamList()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(teamName: string) {
    setTeamSelected(teamName)
    setAnchorEl(null)
  }

  return (
    <div className="my-2 flex w-full items-start justify-start ">
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
            {!teamSelected || teamSelected.length === 0
              ? 'Select Team'
              : `${teamSelected}`}
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </h2>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose('')}
          className="menu h-[40%]  sm:h-[50%]"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {seasonList.map((team, index) => (
            <MenuItem
              key={index}
              className="hover:bg-[#cfd8dc]"
              onClick={() => handleClose(team.idName)}
            >
              {team.idName} {team.idName.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}