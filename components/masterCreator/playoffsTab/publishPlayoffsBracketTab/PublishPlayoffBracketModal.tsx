import MuiModal from '@mui/material/Modal'

import { modalState, submissionData } from '../../../../atoms/seasonModalAtoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedPlayoffBracket,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import {
  showDeleteBracketModal,
  showPublishBracketModal,
} from '../../../../atoms/playoffsAtoms'

function PublishPlayoffBracketModal() {
  const [showModal, setShowModal] = useRecoilState(showPublishBracketModal)

  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const playoffBracket = useRecoilValue(selectedPlayoffBracket)

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="mx-auto my-auto h-[55%] w-[25%] border-2 border-black bg-[#64b5f6] p-4"
    >
      <div className="text-xl font-semibold text-white">
        <h2>Submission has been completed!</h2>
        <br />
        <h3>
          The following playoff bracket has been pushed, meaning the playoff
          bracket is viewable in the Main Page:
        </h3>
        <div className="p-5">
          <p className="pb-5">
            Season: <span className="capitalize text-yellow-300">{season}</span>
          </p>
          <p className="pb-5">
            Division:{' '}
            <span className="capitalize text-yellow-300">{division}</span>
          </p>
          <p className="pb-5">
            Schedule Week:{' '}
            <span className="capitalize text-yellow-300">
              {playoffBracket.bracketName}
            </span>
          </p>
        </div>
      </div>
    </MuiModal>
  )
}

export default PublishPlayoffBracketModal
