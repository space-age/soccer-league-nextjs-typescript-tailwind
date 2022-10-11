import { DocumentData } from 'firebase/firestore'
import { ScheduleList } from '../../typings'
import BasicTeamSchedule from './BasicTeamSchedule'

interface Props {
  list: ScheduleList | DocumentData
}

/**
 * Displays a container of the current schedule data: field number, teamA, teamB, scoredA, scoredB, and game time
 * If window size is less than 640px, for phone view, display the BasicTeamsSchedule component instead
 * @param list
 * @returns a container of current schedule data
 */
function TeamSchedule({ list }: Props) {
  return (
    <>
      <BasicTeamSchedule list={list} />
      <div className=" hidden w-full grid-cols-7 items-center  justify-self-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc] px-2 py-3 text-xl  font-semibold shadow-lg   sm:grid md:w-[98%] md:justify-items-center lg:w-[70%] ">
        <p className="text-[#00acc1]">Field: {list.fieldNumber}</p>
        <div className="col-start-2 col-end-4 px-3">
          <p className="overflow-hidden text-clip">{list.teamA}</p>
        </div>
        <div className="flex flex-row gap-3 self-center ">
          <p className="self-center text-[#00acc1]">({list.scoredA})</p>
          <p className="self-center">vs.</p>
          <p className="self-center text-[#00acc1]">({list.scoredB})</p>
        </div>
        <div className="col-start-5 col-end-7 px-3">
          <p className="overflow-hidden text-ellipsis">{list.teamB}</p>
        </div>
        <p className="text-[#00acc1]">Time: {list.time}</p>
      </div>
      <div className="bg-[#37474f] py-1 sm:py-0"></div>
    </>
  )
}

export default TeamSchedule
