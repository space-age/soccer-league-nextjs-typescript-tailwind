import React from 'react'
import { Playoff } from '../../../../typings'

interface Props {
  game: Playoff
}

function PlayoffOfficialGame({ game }: Props) {
  return (
    <>
      <div>
        <p className="text-center text-xl font-bold">
          Game Date:{' '}
          <span className="text-[#00acc1]">
            {!game?.date || game?.date.length === 0 ? 'TBD' : game?.date}
          </span>
        </p>
      </div>
      <div className="my-4  grid w-full grid-cols-7  justify-items-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc] px-2  py-3 text-xl font-semibold shadow-lg">
        <p className="text-[#00acc1]">
          Field: {game?.fieldNumber === null ? 'TBD' : game?.fieldNumber}
        </p>
        <div className="col-start-2 col-end-4 px-3">
          <p className="overflow-hidden text-clip">
            {!game?.teamA || game?.teamA.length === 0 ? 'Team A' : game?.teamA}{' '}
          </p>
        </div>
        <div className="flex flex-row gap-3 self-center ">
          <p className="self-center text-[#00acc1]">
            {game?.scoredA === null ? '( )' : game?.scoredA}
          </p>
          <p className="self-center">-</p>
          <p className="self-center text-[#00acc1]">
            {game?.scoredB === null ? '( )' : game?.scoredB}
          </p>
        </div>
        <div className="col-start-5 col-end-7 px-3">
          <p className="overflow-hidden text-ellipsis">
            {!game?.teamB || game?.teamB.length === 0 ? 'Team B' : game?.teamB}
          </p>
        </div>
        <p className="text-[#00acc1]">
          Time: {!game?.time || game?.time.length === 0 ? 'TBD' : game?.time}
        </p>
      </div>
    </>
  )
}

export default PlayoffOfficialGame
