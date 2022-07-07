import Link from 'next/link'
import React from 'react'

import HomeIcon from '@mui/icons-material/Home'
import { useRecoilState, useResetRecoilState } from 'recoil'
import {
  selectedDivision,
  selectedSeason,
  selectedTeam,
} from '../../../atoms/seasonAtoms'

interface Props {
  hide: boolean
}

function HomeButton(props: Props) {
  const { hide } = props

  const resetSeason = useResetRecoilState(selectedSeason)
  const resetDivision = useResetRecoilState(selectedDivision)
  const resetTeam = useResetRecoilState(selectedTeam)

  const handleLinkClick = () => {
    resetSeason()
    resetDivision()
    resetTeam()
  }

  return (
    <div>
      <Link href="/">
        {!hide ? (
          <HomeIcon
            onClick={handleLinkClick}
            className={`!absolute !bottom-24 !right-9 cursor-pointer !text-2xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]`}
          />
        ) : (
          <p
            onClick={handleLinkClick}
            className={
              '!absolute !bottom-24 !right-9 cursor-pointer !text-3xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]'
            }
          >
            Home
          </p>
        )}
      </Link>
    </div>
  )
}

export default HomeButton
