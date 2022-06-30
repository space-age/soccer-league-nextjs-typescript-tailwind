import { Schedule } from '../../typings'
import TemplateBasicTeamSchedule from './TemplateBasicTeamSchedule'

interface Props {
  schedule: Schedule
}

function TemplateTeamSchedule({ schedule }: Props) {
  return (
    <>
      <TemplateBasicTeamSchedule schedule={schedule} />
      <div className=" hidden w-full grid-cols-7 items-center  justify-self-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc] px-2 py-3 text-xl  font-semibold shadow-lg   sm:grid md:w-[98%] md:justify-items-center lg:w-[70%] ">
        <p className="text-[#00acc1]">Field: {schedule.field}</p>
        <div className="col-start-2 col-end-4 px-3">
          <p className="overflow-hidden text-clip">{schedule.teamA}</p>
        </div>
        <div className="flex flex-row gap-3 self-center ">
          <p className="self-center text-[#00acc1]">({schedule.scoreA})</p>
          <p className="self-center">vs.</p>
          <p className="self-center text-[#00acc1]">({schedule.scoreB})</p>
        </div>
        <div className="col-start-5 col-end-7 px-3">
          <p className="overflow-hidden text-ellipsis">{schedule.teamB}</p>
        </div>
        <p className="text-[#00acc1]">Time: {schedule.time}</p>
      </div>
      <div className="bg-[#37474f] py-1 sm:py-0"></div>
    </>
  )
}

export default TemplateTeamSchedule
