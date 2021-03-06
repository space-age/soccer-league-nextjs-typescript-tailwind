import { DocumentData } from 'firebase/firestore'
import { ScheduleList } from '../../../../typings'

interface Props {
  list: ScheduleList | DocumentData
}

function Schedule({ list }: Props) {
  return (
    <div>
      <div className="my-4 grid w-full grid-cols-7  justify-items-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc] px-2  py-3 text-xl font-semibold shadow-lg">
        <p className="text-[#00acc1]">Field: {list.fieldNumber}</p>
        <div className="col-start-2 col-end-4 px-3">
          <p className="overflow-hidden text-clip">{list.teamA}</p>
        </div>
        <div className="flex flex-row gap-3 self-center ">
          <p className="self-center text-[#00acc1]">
            {list.scoredA === null ? 'TBD' : list.scoredA}
          </p>
          <p className="self-center">-</p>
          <p className="self-center text-[#00acc1]">
            {list.scoredB === null ? 'TBD' : list.scoredB}
          </p>
        </div>
        <div className="col-start-5 col-end-7 px-3">
          <p className="overflow-hidden text-ellipsis">{list.teamB}</p>
        </div>
        <p className="text-[#00acc1]">Time: {list.time}</p>
      </div>
    </div>
  )
}

export default Schedule
