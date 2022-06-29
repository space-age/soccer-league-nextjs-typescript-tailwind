import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import { useRecoilState, useResetRecoilState } from 'recoil'
import {
  mainSelectedDivision,
  mainSelectedScheduleWeek,
  mainSelectedSeason,
} from '../../../atoms/mainPageAtoms'
import useSeasonList from '../../../hooks/useSeasonList'
import useAssignments from '../../../hooks/useAssignments'
import { selectedSeason } from '../../../atoms/seasonAtoms'

export default function SchedulesSeasonsDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const assignments = useAssignments()
  const seasonList = useSeasonList()
  const [seasonSelected, setSeasonSelected] = useRecoilState(selectedSeason)
  // setSeasonSelected(assignments?.currentSeason)

  useEffect(() => {
    setSeasonSelected(assignments?.currentSeason)
  }, [assignments])

  // const resetDivision = useResetRecoilState(mainSelectedDivision)
  // const resetWeekSchedule = useResetRecoilState(mainSelectedScheduleWeek)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(seasonName: string) {
    setSeasonSelected(seasonName)
    if (!(!seasonName || seasonName.length === 0)) {
      // resetDivision()
      // resetWeekSchedule()
      // setDivisionSelected('')
    }

    setAnchorEl(null)
  }

  return (
    <div className="my-2 flex  ">
      <div className="rounded-md border-2 border-[#00838f] ">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className=" bg-[#eeeeee] !text-black"
        >
          <h2 className="text-md font-semibold text-black sm:text-2xl">
            {!seasonSelected || seasonSelected.length === 0
              ? 'Select Season'
              : `${seasonSelected}`}
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
          {!seasonList.length ? (
            <MenuItem
              className="uppercase hover:bg-[#cfd8dc]"
              onClick={() => handleClose('')}
            >
              No Season Found
            </MenuItem>
          ) : (
            seasonList.map((season, index) => (
              <MenuItem
                key={index}
                className="hover:bg-[#cfd8dc]"
                onClick={() => handleClose(season.idName)}
              >
                {season.idName}
              </MenuItem>
            ))
          )}
        </Menu>
      </div>
    </div>
  )
}
