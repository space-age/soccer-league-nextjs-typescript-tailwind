import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'

import { selectedPlayoffBracket } from '../../../../../atoms/seasonAtoms'
import { useRecoilState } from 'recoil'
import { PlayoffsBracket } from '../../../../../typings'
import { DocumentData } from 'firebase/firestore'
import useBracketPlayoffList from '../../../../../hooks/useBracketPlayoffList'

export default function PlayoffBracketList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [bracketPlayoffSelected, setBracketPlayoffSelected] = useRecoilState(
    selectedPlayoffBracket
  )

  const bracketPlayoffList = useBracketPlayoffList()

  const defaultBracketPlayoff = {
    idName: '',
    date: '',
    bracketName: '',
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(bracket: PlayoffsBracket | DocumentData) {
    setBracketPlayoffSelected(bracket)
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
            {!bracketPlayoffSelected ||
            bracketPlayoffSelected.idName.length === 0
              ? 'Select Week Schedule'
              : `${bracketPlayoffSelected.date} (${bracketPlayoffSelected.bracketName})`}
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </h2>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(defaultBracketPlayoff)}
          className="menu h-[40%]  sm:h-[50%]"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {!bracketPlayoffList.length ? (
            <MenuItem
              className="uppercase hover:bg-[#cfd8dc]"
              onClick={() => handleClose(defaultBracketPlayoff)}
            >
              No week schedule
            </MenuItem>
          ) : (
            bracketPlayoffList.map((bracket, index) => (
              <MenuItem
                key={index}
                className="hover:bg-[#cfd8dc]"
                onClick={() => handleClose(bracket)}
              >
                {bracket.date} ({bracket.bracketName})
              </MenuItem>
            ))
          )}
        </Menu>
      </div>
    </div>
  )
}
