import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

import {
  selectedDivision,
  selectedScheduleWeek,
  selectedTeam,
} from '../../../../../atoms/seasonAtoms'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import useDivisionList from '../../../../../hooks/useDivisionList'
import { v4 as uuidv4 } from 'uuid'

/**
 * A material ui button that displays drop-down options of all divisions in the database within the selected season
 */
export default function DivisionList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const resetWeekSchedule = useResetRecoilState(selectedScheduleWeek)
  const [divisionSelected, setDivisionSelected] =
    useRecoilState(selectedDivision)

  const divisionList = useDivisionList()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const resetTeam = useResetRecoilState(selectedTeam)

  function handleClose(divisionName: string) {
    setDivisionSelected(divisionName)
    if (!(!divisionName || divisionName.length === 0)) {
      resetTeam()
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
          {divisionList.map((division, index) => (
            <MenuItem
              key={uuidv4()}
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
