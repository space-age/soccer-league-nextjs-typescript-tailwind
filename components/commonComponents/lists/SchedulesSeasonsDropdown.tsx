import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import { useRecoilState, useResetRecoilState } from 'recoil'
import useSeasonList from '../../../hooks/useSeasonList'
import useAssignments from '../../../hooks/useAssignments'
import {
  selectedSeason,
  selectedDivision,
  selectedScheduleWeek,
} from '../../../atoms/seasonAtoms'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  stage: string
}

export default function SchedulesSeasonsDropdown({ stage }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const assignments = useAssignments()
  const seasonList = useSeasonList()
  const [seasonSelected, setSeasonSelected] = useRecoilState(selectedSeason)

  if (stage === 'season') {
    useEffect(() => {
      setSeasonSelected(assignments?.currentSeason)
    }, [assignments])
  }

  if (stage === 'playoffs') {
    useEffect(() => {
      setSeasonSelected(assignments?.currentPlayoffSeason)
    }, [assignments])
  }

  const resetDivision = useResetRecoilState(selectedDivision)
  const resetWeekSchedule = useResetRecoilState(selectedScheduleWeek)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(seasonName: string) {
    setSeasonSelected(seasonName)
    if (!seasonName || seasonName.length === 0) {
      resetDivision()
      resetWeekSchedule()
      // setDivisionSelected('')
    }

    setAnchorEl(null)
  }

  return (
    <div className="m-auto my-2 flex sm:m-0">
      <div className="rounded-md border-2 border-[#00838f] ">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className=" bg-[#eeeeee] !text-black"
        >
          <h2 className="text-md font-semibold text-black sm:text-lg lg:text-2xl">
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
                key={uuidv4()}
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
