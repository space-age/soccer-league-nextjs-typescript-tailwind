import { useRecoilValue } from 'recoil'
import { selectedScheduleWeek } from '../../../../atoms/seasonAtoms'
import AddScheduleForm from '../createWeekScheduleTab/AddScheduleForm'
import CurrentScheduleList from './CurrentScheduleList'

function ScheduleListContainer() {
  const scheduleWeekList = useRecoilValue(selectedScheduleWeek)
  return (
    <div>
      <AddScheduleForm />
      <div className="my-5 rounded-sm border-2  border-[#ccc] bg-[#eeeeee] p-3">
        <div>
          <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
            Schedules for:{' '}
            <span className="text-[#006064]">{scheduleWeekList}</span>
          </h1>
        </div>
        <CurrentScheduleList />
      </div>
    </div>
  )
}

export default ScheduleListContainer
