import { Schedule } from '../../typings'
import BasicTeamSchedule from './BasicTeamSchedule'

interface Props {
  schedule: Schedule
}

function TeamSchedule({ schedule }: Props) {
  const mainColor = '#00acc1'
  return (
    <>
      <BasicTeamSchedule schedule={schedule} />
      <div className=" hidden w-full grid-cols-7  items-center justify-self-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc] px-2 py-3  font-semibold shadow-lg   sm:grid md:w-[98%] md:justify-items-center lg:w-[70%] ">
        <p className={`text-[${mainColor}]`}>Field: {schedule.field}</p>
        <div className="col-start-2 col-end-4 px-3">
          <p className="overflow-hidden text-clip">{schedule.teamA}</p>
        </div>
        <div className="flex flex-row gap-3 self-center ">
          <p className={`self-center text-[${mainColor}]`}>
            ({schedule.scoreA})
          </p>
          <p className="self-center">vs.</p>
          <p className={`self-center text-[${mainColor}]`}>
            ({schedule.scoreB})
          </p>
        </div>
        <div className="col-start-5 col-end-7 px-3">
          <p className="overflow-hidden text-ellipsis">{schedule.teamB}</p>
        </div>
        <p className={`text-[${mainColor}]`}>Time: {schedule.time}</p>
      </div>
      <div className="bg-[#37474f] py-1 sm:py-0"></div>
    </>
  )
}

export default TeamSchedule
