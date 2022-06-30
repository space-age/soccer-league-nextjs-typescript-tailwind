import Head from 'next/head'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'
import image from '../images/schedules-bg.jpg'
import SchedulesSeasonsDropdown from '../components/schedulePage/lists/SchedulesSeasonsDropdown'
import SchedulesDivisionsDropdown from '../components/schedulePage/lists/SchedulesDivisionsDropdown'
import SchedulesWeekScheduleDropdown from '../components/schedulePage/lists/SchedulesWeekScheduleDropdown'
import SheduleWeekListContainer from '../components/schedulePage/SheduleWeekListContainer'

function SchedulesPage() {
  return (
    <div className="h-screen ">
      <Head>
        <title>Adult Soccer Schedules</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      <Header />
      <main className="relative pb-4 md:pb-10">
        <CommonBanner image={image} title="schedules" />
        <div className="mt-4 flex flex-col sm:mt-8 sm:flex-row sm:justify-center sm:gap-10">
          <SchedulesSeasonsDropdown />
          <SchedulesDivisionsDropdown />
          <SchedulesWeekScheduleDropdown />
        </div>
        <SheduleWeekListContainer />
      </main>
    </div>
  )
}

export default SchedulesPage
