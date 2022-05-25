import TeamSchedule from './TeamSchedule'

function ScheduleWeekList() {
  const defaultSchedule = {
    field: 'TBD',
    teamA: 'Team A',
    teamB: 'Team B',
    scoreA: ' ',
    scoreB: ' ',
    time: 'TBD',
  }

  const test1 = {
    field: '10',
    teamA: 'Super Max Dupper Team A',
    teamB: 'Super Max Dupper Team B',
    scoreA: '2',
    scoreB: '3',
    time: '10:00am',
  }

  return (
    <div className="col-span-1 my-5 grid rounded-sm border-2  border-[#ccc] bg-[#eeeeee] py-3 text-[#212121] shadow-xl sm:gap-5 md:m-5 md:py-5 lg:m-7">
      <div>
        <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
          Matchday (18) | 2022-05-23
        </h1>
      </div>
      <TeamSchedule schedule={defaultSchedule} />
      <div className="bg-[#37474f] py-1 sm:py-0"></div>
      <TeamSchedule schedule={test1} />
      <div className="bg-[#37474f] py-1 sm:py-0"></div>
    </div>
  )
}

export default ScheduleWeekList
