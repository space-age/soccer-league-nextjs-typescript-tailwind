import { useRecoilValue } from 'recoil'
import { selectedScheduleWeek } from '../../atoms/seasonAtoms'
import ScheduleWeekList from './ScheduleWeekList'

function SheduleWeekListContainer() {
  const scheduleWeekList = useRecoilValue(selectedScheduleWeek)

  const title =
    !scheduleWeekList?.idName ||
    scheduleWeekList?.idName.length === 0 ||
    scheduleWeekList === undefined
      ? 'Select a Week Schedule to view a different Schedule'
      : `${scheduleWeekList.weekName} | ${scheduleWeekList.date}`

  return (
    <div className="col-span-1 my-5 grid rounded-sm border-2  border-[#ccc] bg-[#eeeeee] py-3 text-[#212121] shadow-xl sm:gap-5 md:m-5 md:py-5 lg:m-7">
      <div>
        <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
          {title}
        </h1>
      </div>
      <ScheduleWeekList />
    </div>
  )
}

export default SheduleWeekListContainer
