import MuiModal from '@mui/material/Modal'
import Image from 'next/image'
import { useState } from 'react'
import img from '../../images/cancelgame.jpg'

function GameCancelModal() {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
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
            Schedule Date: 07/07/22
          </p>

          <p className="mt-10 text-center text-2xl sm:ml-10 sm:text-3xl">
            Enjoy your Sunday!
          </p>
          <p className="mt-10 text-center text-xl sm:ml-10 sm:text-xl">
            ( Click anywhere to exit message )
          </p>
        </div>
        <div
          className="absolute top-0 left-0 -z-10  h-[100vh] w-full  
        "
        >
          <Image src={img} layout="fill" objectFit="cover" alt="Soccer Field" />
        </div>
      </div>
    </MuiModal>
  )
}

export default GameCancelModal
