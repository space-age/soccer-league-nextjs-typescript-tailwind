import Link from 'next/link'
import React from 'react'

import HomeIcon from '@mui/icons-material/Home'

interface Props {
  hide: boolean
}

function HomeButton(props: Props) {
  const { hide } = props
  return (
    <div>
      <Link href="/">
        {!hide ? (
          <HomeIcon
            className={`!absolute !bottom-24 !right-9 cursor-pointer !text-2xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]`}
          />
        ) : (
          <p
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
