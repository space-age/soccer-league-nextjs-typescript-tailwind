import MuiModal from '@mui/material/Modal'

import {
  modalState,
  submissionData,
} from '../../../../atoms/addSeasonModalAtoms'
import { useRecoilState, useRecoilValue } from 'recoil'

function ShowAddSeasonModal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const data = useRecoilValue(submissionData)

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="mx-auto my-auto h-[40%] w-[25%] border-2 border-black bg-[#64b5f6] p-4"
    >
      <div className="text-xl font-semibold text-white">
        <h2>Submission has been completed!</h2>
        <br />
        <h3>Data entered:</h3>
        <div className="p-5">
          <p className="pb-5">
            Season name:{' '}
            <span className="capitalize text-yellow-300">
              {data?.seasonName}
            </span>
          </p>
          <p>Divisions:</p>
          {data?.divisionsName.map((division, index) => (
            <p key={index} className="pl-8 text-yellow-300">
              {division.name}
              {/* <span className="text-yellow-300"> {division.name}</span> */}
            </p>
          ))}
        </div>
        {/* <p className="pt-10 text-sm text-red-400">
          Click anywhere outside the window to close
        </p> */}
      </div>
    </MuiModal>
  )
}

export default ShowAddSeasonModal
