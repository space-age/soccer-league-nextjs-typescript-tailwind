import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

import { useRecoilState } from 'recoil'
import { DocumentData } from 'firebase/firestore'
import useAssignments from '../../../hooks/useAssignments'
import { selectedPlayoffBracket } from '../../../atoms/seasonAtoms'
import { WeekScheduleList } from '../../../typings'
import useBracketPlayoffList from '../../../hooks/useBracketPlayoffList'
import { v4 as uuidv4 } from 'uuid'

export default function PlayoffsBracketsDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const assignments = useAssignments()
  const bracketPlayoffsList = useBracketPlayoffList()
  const [bracketSelected, setBracketSelected] = useRecoilState(
    selectedPlayoffBracket
  )

  useEffect(() => {
    setBracketSelected(assignments?.currentPlayoffBracket)
  }, [assignments])

  const defaultPlayoffBracket = {
    idName: '',
    date: '',
    bracketName: '',
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(bracket: WeekScheduleList | DocumentData) {
    setBracketSelected(bracket)
    setAnchorEl(null)
  }

  //Sorts the array from highest date to lowest date
  bracketPlayoffsList.sort(function (a, b) {
    return b.date! < a.date! ? -1 : 1
  })

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
            !bracketPlayoffsList || bracketPlayoffsList.length === 0
              ? true
              : false
          }
        >
          <h2 className="text-md font-semibold text-black sm:text-lg lg:text-2xl">
            {!bracketSelected || bracketSelected.idName.length === 0
              ? 'Select Playoff Bracket'
              : `${bracketSelected.date} (${bracketSelected.bracketName})`}
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </h2>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(defaultPlayoffBracket)}
          className="menu h-[40%]  sm:h-[50%]"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {!bracketPlayoffsList.length ? (
            <MenuItem
              className="uppercase hover:bg-[#cfd8dc]"
              onClick={() => handleClose(defaultPlayoffBracket)}
            >
              No playoff bracket
            </MenuItem>
          ) : (
            bracketPlayoffsList.map(
              (bracket, index) =>
                bracket.pushed && (
                  <MenuItem
                    key={uuidv4()}
                    className="hover:bg-[#cfd8dc]"
                    onClick={() => handleClose(bracket)}
                  >
                    {bracket.date} ({bracket.bracketName})
                  </MenuItem>
                )
            )
          )}
        </Menu>
      </div>
    </div>
  )
}
