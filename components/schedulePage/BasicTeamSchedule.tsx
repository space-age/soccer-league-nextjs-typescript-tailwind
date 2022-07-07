import { DocumentData } from 'firebase/firestore'
import { Schedule, ScheduleList } from '../../typings'

interface Props {
  list: ScheduleList | DocumentData
}

function BasicTeamSchedule({ list }: Props) {
  return (
    <div className="grid w-full grid-rows-2 items-center justify-self-center overflow-auto bg-[#455a64] px-2  py-3 font-semibold sm:!hidden">
      <div className="flex flex-row justify-between">
        <p className="text-[#00acc1]">Field: {list.fieldNumber}</p>
        <p className="text-[#00acc1]">Time: {list.time}</p>
      </div>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 ml-2 justify-self-start">
          <p className="overflow-hidden text-ellipsis text-[#e0e0e0]">
            {list.teamA}
          </p>
        </div>
        <div className="flex flex-row gap-3 self-center ">
          <p className="self-center text-[#00acc1]">({list.scoredA})</p>
          <p className="self-center text-[#e0e0e0]">vs.</p>
          <p className="self-center text-[#00acc1]">({list.scoredB})</p>
        </div>
        <div className="col-span-2 mr-2 justify-self-end">
          <p className="overflow-hidden text-ellipsis text-[#e0e0e0]">
            {list.teamB}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BasicTeamSchedule
