import MuiModal from '@mui/material/Modal'

import { modalState, submissionData } from '../../../../atoms/seasonModalAtoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

/**
 * Material UI modal to display message that submission of season and divisions has been completed
 */
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
            <p key={uuidv4()} className="pl-8 text-yellow-300">
              {division.name}
            </p>
          ))}
        </div>
      </div>
    </MuiModal>
  )
}

export default ShowAddSeasonModal
