import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import { useRecoilState, useResetRecoilState } from 'recoil'
import useAssignments from '../../../hooks/useAssignments'
import useDivisionList from '../../../hooks/useDivisionList'
import {
  selectedDivision,
  selectedScheduleWeek,
} from '../../../atoms/seasonAtoms'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  stage: string
}

export default function SchedulesDivisionsDropdown({ stage }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const assignments = useAssignments()
  const divisionList = useDivisionList()

  const [divisionSelected, setDivisionSelected] =
    useRecoilState(selectedDivision)

  if (stage === 'season') {
    useEffect(() => {
      setDivisionSelected(assignments?.currentDivision)
    }, [assignments])
  }

  if (stage === 'playoffs') {
    useEffect(() => {
      setDivisionSelected(assignments?.currentPlayoffDivision)
    }, [assignments])
  }

  const resetWeekSchedule = useResetRecoilState(selectedScheduleWeek)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(divisionName: string) {
    setDivisionSelected(divisionName)
    if (!divisionName || divisionName.length === 0) {
      resetWeekSchedule()
    }

    setAnchorEl(null)
  }

  return (
    <div className="m-auto my-2 flex sm:m-0">
      <div className=" rounded-md border-2 border-[#00838f]">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className=" bg-[#eeeeee] !text-black disabled:opacity-50"
          disabled={!divisionList || divisionList.length === 0 ? true : false}
        >
          <h2 className="text-md font-semibold text-black sm:text-lg lg:text-2xl">
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
