import { useRecoilValue } from 'recoil'
import { selectedPlayoffBracket } from '../../../../atoms/seasonAtoms'
import PlayoffBracketContainer from './PlayoffBracketContainer'

function AddPlayoffsGamesContainer() {
  const selectedBracket = useRecoilValue(selectedPlayoffBracket)

  return (
    <div className="my-5 rounded-sm border-2  border-[#ccc] bg-[#eeeeee] py-2">
      <div className="flex justify-center  gap-5">
        <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
          Playoff Bracket Name:{' '}
          <span className="text-[#006064]">{selectedBracket.bracketName}</span>
        </h1>
        <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
          Start Date:{' '}
          <span className="text-[#006064]">{selectedBracket.date}</span>
        </h1>
      </div>
      <PlayoffBracketContainer />
    </div>
  )
}

export default AddPlayoffsGamesContainer
