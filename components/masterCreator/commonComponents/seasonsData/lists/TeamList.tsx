import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

import { selectedTeam } from '../../../../../atoms/seasonAtoms'
import { useRecoilState } from 'recoil'
import useTeamList from '../../../../../hooks/useTeamList'
import { v4 as uuidv4 } from 'uuid'

export default function TeamList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [teamSelected, setTeamSelected] = useRecoilState(selectedTeam)

  const teamList = useTeamList()

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
          {!teamList.length ? (
            <MenuItem
              className="uppercase hover:bg-[#cfd8dc]"
              onClick={() => handleClose('')}
            >
              No Team Found
            </MenuItem>
          ) : (
            teamList.map((team, index) => (
              <MenuItem
                key={uuidv4()}
                className="hover:bg-[#cfd8dc]"
                onClick={() => handleClose(team.idName)}
              >
                {team.name}
              </MenuItem>
            ))
          )}
        </Menu>
      </div>
    </div>
  )
}
