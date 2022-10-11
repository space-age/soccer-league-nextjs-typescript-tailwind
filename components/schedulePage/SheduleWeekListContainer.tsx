import { useRecoilValue } from 'recoil'
import { selectedScheduleWeek } from '../../atoms/seasonAtoms'
import ScheduleWeekList from './ScheduleWeekList'

/**
 * Schedule Week List container
 * Displaying title of current selected schedule week name or a default name
 * Using ScheduleWeekList container to display all schedules inside the week schedule
 */
function SheduleWeekListContainer() {
  const currentScheduleWeek = useRecoilValue(selectedScheduleWeek)

  /**
   * If current schedule week does not existsm then set to true or else false
   * It will be a check to determine what to display for title
   */
  const check =
    !currentScheduleWeek?.idName ||
    currentScheduleWeek?.idName.length === 0 ||
    currentScheduleWeek === undefined
      ? true
      : false

  // title of the container depending on the check done on whether ther is a current schedule week selected
  const title = check
    ? 'Select a Season, Division, and Week Schedule to view week schedules'
    : `${currentScheduleWeek.weekName} | ${currentScheduleWeek.date}`

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
