import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

import { selectedScheduleWeek } from '../../../../../atoms/seasonAtoms'
import { useRecoilState } from 'recoil'
import useWeeksSchedulesList from '../../../../../hooks/useWeeksSchedulesList'
import { WeekScheduleList } from '../../../../../typings'

export default function ScheduleList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [weekSelected, setWeekSelected] = useRecoilState(selectedScheduleWeek)

  const scheduleWeekList = useWeeksSchedulesList()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(name: string) {
    setWeekSelected(name)
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
            {!weekSelected || weekSelected.length === 0
              ? 'Select Week Schedule'
              : `${weekSelected}`}
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
          {!scheduleWeekList.length ? (
            <MenuItem
              className="uppercase hover:bg-[#cfd8dc]"
              onClick={() => handleClose('')}
            >
              No week schedule
            </MenuItem>
          ) : (
            scheduleWeekList.map((schedule, index) => (
              <MenuItem
                key={index}
                className="hover:bg-[#cfd8dc]"
                onClick={() => handleClose(schedule.idName)}
              >
                Week {schedule.weekNumber} ({schedule.idName})
              </MenuItem>
            ))
          )}
        </Menu>
      </div>
    </div>
  )
}
