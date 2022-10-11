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

/**
 * A material ui button with dropdown options of all divisions in the database collection "Divisions" inside the current selected season
 * @param stage {string}
 * @returns dropdown options of all divisions in database within the current season
 */
export default function SchedulesDivisionsDropdown({ stage }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const assignments = useAssignments() //data from document Assignments inside Firebase
  const divisionList = useDivisionList() //array of all the documents names(id) inside the collection "Divisions"

  const [divisionSelected, setDivisionSelected] =
    useRecoilState(selectedDivision) //state to set the current selected division

  /**
   * If props stage is season, then set the state divisionSelected to the assignment.currentDivision
   */
  if (stage === 'season') {
    useEffect(() => {
      setDivisionSelected(assignments?.currentDivision)
    }, [assignments])
  }

  /**
   * If props stage is playoffs, then set the state divisionSelected to the assignment.currentPlayoffDivision
   */
  if (stage === 'playoffs') {
    useEffect(() => {
      setDivisionSelected(assignments?.currentPlayoffDivision)
    }, [assignments])
  }

  const resetWeekSchedule = useResetRecoilState(selectedScheduleWeek)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  /**
   * Parameter will be set to the recoil state
   * If no division selected, reset week schedule to their defaul recoil state
   * @param divisionName {string}
   */
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
