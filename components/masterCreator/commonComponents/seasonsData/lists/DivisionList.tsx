import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
  selectedTeam,
} from '../../../../../atoms/seasonAtoms'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import useDivisionList from '../../../../../hooks/useDivisionList'

export default function DivisionList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const resetWeekSchedule = useResetRecoilState(selectedScheduleWeek)
  const [divisionSelected, setDivisionSelected] =
    useRecoilState(selectedDivision)

  const seasonList = useDivisionList()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const [teamSelected, setTeamSelected] = useRecoilState(selectedTeam)

  function handleClose(divisionName: string) {
    setDivisionSelected(divisionName)
    if (!(!divisionName || divisionName.length === 0)) {
      setTeamSelected('')
      resetWeekSchedule()
    }

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
            {!divisionSelected || divisionSelected.length === 0
              ? 'Select Division'
              : `${divisionSelected}`}
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
          {seasonList.map((division, index) => (
            <MenuItem
              key={index}
              className="hover:bg-[#cfd8dc]"
              onClick={() => handleClose(division.idName)}
            >
              {division.idName}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}
