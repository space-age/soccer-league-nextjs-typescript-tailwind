import { Schedule } from '../../typings'
import BasicTeamSchedule from './BasicTeamSchedule'

interface Props {
  schedule: Schedule
}

function TeamSchedule({ schedule }: Props) {
  return (
    <div className="grid w-full grid-cols-5 items-center justify-self-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc]  px-2 py-3  font-semibold shadow-lg md:w-[98%] md:justify-items-center lg:w-[70%] ">
      <p className=" text-[#00acc1]">Field: {schedule.field}</p>
      <div>
        <p className="overflow-hidden text-ellipsis">{schedule.teamA}</p>
      </div>
      <div className="flex flex-row gap-3 self-center ">
        <p className=" self-center text-[#00acc1]">({schedule.scoreA})</p>
        <p className="self-center">vs.</p>
        <p className="self-center text-[#00acc1]">({schedule.scoreB})</p>
      </div>
      <div>
        <p className="overflow-hidden text-ellipsis">{schedule.teamB}</p>
      </div>
      <p className="text-[#00acc1]">Time: {schedule.time}</p>
    </div>
  )
}

export default TeamSchedule
