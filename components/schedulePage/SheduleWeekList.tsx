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
    teamA: 'SuperMaxDupper Team A',
    teamB: 'SuperMaxDupper Team B',
    scoreA: '2',
    scoreB: '3',
    time: '10:00am',
  }

  return (
    <div className="col-span-1 my-5 grid gap-5  rounded-sm border-2 border-[#ccc] bg-[#eeeeee] py-5 text-[#212121] shadow-xl md:m-5 lg:m-7">
      <div>
        <h1 className="p-2 text-center text-3xl font-bold">
          Matchday (18) | 2022-05-23
        </h1>
      </div>
      <TeamSchedule schedule={defaultSchedule} />
      <TeamSchedule schedule={test1} />
    </div>
  )
}

export default ScheduleWeekList
