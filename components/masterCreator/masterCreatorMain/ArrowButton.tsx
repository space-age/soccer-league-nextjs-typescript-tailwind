import { Button } from '@mui/material'
import React from 'react'

import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'

/*
  Returns the arrow button: 
    left arrow when not hiding options and right arrow when not hiding options
  When button click, it will toggle the hide value from true/false
*/
interface Props {
  hide: boolean
  handleButton: () => void
}

/**
 *  Returns the arrow button:
 * left arrow when not hiding options and right arrow when not hiding options
 *    When button click, it will toggle the hide value from true/false
 * @param props
 */
function ArrowButton(props: Props) {
  const { hide, handleButton } = props
  return (
    <div className={'!absolute !bottom-40 !right-5'}>
      <Button onClick={handleButton}>
        {hide ? (
          <KeyboardDoubleArrowLeftOutlinedIcon className="!text-5xl !text-[#fafafa] hover:!text-[#03a9f4]" />
        ) : (
          <KeyboardDoubleArrowRightOutlinedIcon className="!pl-3 !text-5xl !text-[#fafafa] hover:!text-[#03a9f4]" />
        )}
      </Button>
    </div>
  )
}

export default ArrowButton
