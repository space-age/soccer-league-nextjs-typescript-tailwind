import MuiModal from '@mui/material/Modal'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import img from '../../images/cancelgame.jpg'
import { cancelGame, messagedView } from '../../atoms/mainPageAtoms'
import useGameCancel from '../../hooks/useGameCancel'

/**
 * Modal with the message that games have been cancel for a specific date
 * Uses Material-UI Modal for the modal
 * @returns message about cancel game and schedule date
 */

function GameCancelModal() {
  const gameCancelData = useGameCancel() //returns the object of game cancel
  const [showModal, setShowModal] = useRecoilState(cancelGame)
  const [messageViewed, setMessageViewed] = useRecoilState(messagedView)

  /**
   * If the document Game Cancel has been updated,
   * then set the state to show modal according the active value
   * */
  useEffect(() => {
    setShowModal(gameCancelData?.active)
  }, [gameCancelData])

  /**
   * Handler for when modal closes
   * Sets messagedView state to true, will not display the cancel games message to user again
   * Sets showModal state to false, will not open(display) the modal
   */
  const handleClose = () => {
    setMessageViewed(true)
    setShowModal(false)
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-0 !bottom-20 left-0 right-0 z-50 mx-auto w-full 
       rounded-md bg-[#64b5f6]  md:max-w-4xl"
    >
      <div className="text-xl font-bold text-white">
        <div className="absolute top-[50%]  w-full">
          <p className=" text-center text-4xl sm:text-6xl">
            All Games have been cancel
          </p>
          <p className="mt-10 text-center text-3xl sm:text-5xl">
            Schedule Date: {gameCancelData?.date}
          </p>

          <p className="mt-10 text-center text-2xl sm:ml-10 sm:text-3xl">
            Enjoy your Sunday!
          </p>
          <p className="mt-10 text-center text-xl sm:ml-10 sm:text-xl">
            ( Click anywhere below to exit message )
          </p>
        </div>
        <div
          className="absolute top-0 left-0 -z-10  h-[100vh] w-full  
        "
        >
          <Image
            src={img}
            layout="fill"
            objectFit="cover"
            alt="Soccer Ball with mask on"
            placeholder="blur"
            priority
          />
        </div>
      </div>
    </MuiModal>
  )
}

export default GameCancelModal
