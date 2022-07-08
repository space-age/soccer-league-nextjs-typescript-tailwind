import { useRecoilValue } from 'recoil'
import { selectedScheduleWeek } from '../../atoms/seasonAtoms'
import ScheduleWeekList from './ScheduleWeekList'

function SheduleWeekListContainer() {
  const scheduleWeekList = useRecoilValue(selectedScheduleWeek)

  const check =
    !scheduleWeekList?.idName ||
    scheduleWeekList?.idName.length === 0 ||
    scheduleWeekList === undefined
      ? true
      : false

  const title = check
    ? 'Select a Season, Division, and Week Schedule to view week schedules'
    : `${scheduleWeekList.weekName} | ${scheduleWeekList.date}`

  return (
    <div
      className={`${
        check
          ? 'border-2 bg-white'
          : 'border-[1px] border-[#ccc]  bg-[#eeeeee] shadow-xl'
      } col-span-1 my-5 grid rounded-sm py-3 text-[#212121]  sm:gap-5 md:m-5 md:py-5 lg:m-7`}
    >
      <div>
        <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
          {title}
        </h1>
      </div>

      {/* {!check && <ScheduleWeekList />} */}
      <ScheduleWeekList />
    </div>
  )
}

export default SheduleWeekListContainer
