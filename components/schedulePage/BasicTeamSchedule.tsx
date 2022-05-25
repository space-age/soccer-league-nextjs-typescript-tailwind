import { Schedule } from '../../typings'

interface Props {
  schedule: Schedule
}

function BasicTeamSchedule({ schedule }: Props) {
  return (
    <div className="grid w-full grid-rows-2 items-center justify-self-center overflow-auto bg-[#455a64]  px-2 py-3   font-semibold sm:!hidden">
      <div className="flex flex-row justify-between">
        <p className=" text-[#00acc1]">Field: {schedule.field}</p>
        <p className="text-[#00acc1]">Time: {schedule.time}</p>
      </div>
      <div className="flex flex-row justify-around gap-6">
        <div>
          <p className="overflow-hidden text-ellipsis text-[#e0e0e0]">
            {schedule.teamA}
          </p>
        </div>
        <div className="flex flex-row gap-3 self-center ">
          <p className=" self-center text-[#00acc1]">({schedule.scoreA})</p>
          <p className="self-center text-[#e0e0e0]">vs.</p>
          <p className="self-center text-[#00acc1]">({schedule.scoreB})</p>
        </div>
        <div>
          <p className=" overflow-hidden text-ellipsis text-[#e0e0e0]">
            {schedule.teamB}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BasicTeamSchedule
