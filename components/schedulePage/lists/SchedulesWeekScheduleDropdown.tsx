import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

import { useRecoilState } from 'recoil'
import { DocumentData } from 'firebase/firestore'
import useAssignments from '../../../hooks/useAssignments'
import useWeeksSchedulesList from '../../../hooks/useWeeksSchedulesList'
import { selectedScheduleWeek } from '../../../atoms/seasonAtoms'
import { WeekScheduleList } from '../../../typings'

export default function SchedulesWeekScheduleDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const assignments = useAssignments()
  const scheduleWeekList = useWeeksSchedulesList()
  const [weekSelected, setWeekSelected] = useRecoilState(selectedScheduleWeek)

  useEffect(() => {
    setWeekSelected(assignments?.currentWeekSchedule)
  }, [assignments])

  const defaultSchedule = {
    idName: '',
    date: '',
    weekName: '',
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(schedule: WeekScheduleList | DocumentData) {
    setWeekSelected(schedule)
    setAnchorEl(null)
  }

  return (
    <div className="m-auto my-2 flex sm:m-0">
      <div className=" rounded-md border-2 border-[#00838f] ">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className=" bg-[#eeeeee] !text-black disabled:opacity-50"
          disabled={
            !scheduleWeekList || scheduleWeekList.length === 0 ? true : false
          }
        >
          <h2 className="text-md font-semibold text-black sm:text-lg lg:text-2xl">
            {!weekSelected || weekSelected.idName.length === 0
              ? 'Select Week Schedule'
              : `${weekSelected.date} (${weekSelected.weekName})`}
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </h2>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(defaultSchedule)}
          className="menu h-[40%]  sm:h-[50%]"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {!scheduleWeekList.length ? (
            <MenuItem
              className="uppercase hover:bg-[#cfd8dc]"
              onClick={() => handleClose(defaultSchedule)}
            >
              No week schedule
            </MenuItem>
          ) : (
            scheduleWeekList.map(
              (schedule, index) =>
                schedule.pushed && (
                  <MenuItem
                    key={index}
                    className="hover:bg-[#cfd8dc]"
                    onClick={() => handleClose(schedule)}
                  >
                    {schedule.date} ({schedule.weekName})
                  </MenuItem>
                )
            )
          )}
        </Menu>
      </div>
    </div>
  )
}
