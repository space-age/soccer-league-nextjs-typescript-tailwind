import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import useSeasonList from '../../../../hooks/useSeasonList'

import { selectedSeason } from '../../../../atoms/seasonAtoms'
import { useRecoilState } from 'recoil'

export default function SeasonList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [seasonSelected, setSeasonSelected] = useRecoilState(selectedSeason)
  const seasonList = useSeasonList()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  function handleClose(seasonName: string) {
    setSeasonSelected(seasonName)
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
          {seasonList.map((season, index) => (
            <MenuItem
              key={index}
              className="hover:bg-[#cfd8dc]"
              onClick={() => handleClose(season.idName)}
            >
              {season.idName}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}
