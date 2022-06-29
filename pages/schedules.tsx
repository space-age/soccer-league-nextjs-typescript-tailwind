import Head from 'next/head'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'
import SheduleWeekList from '../components/schedulePage/SheduleWeekList'
import image from '../images/schedules-bg.jpg'
import SchedulesSeasonsDropdown from '../components/schedulePage/lists/SchedulesSeasonsDropdown'
import SchedulesDivisionsDropdown from '../components/schedulePage/lists/SchedulesDivisionsDropdown'
import SchedulesWeekScheduleDropdown from '../components/schedulePage/lists/SchedulesWeekScheduleDropdown'

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
        <div className="mt-8 flex justify-center gap-10">
          <SchedulesSeasonsDropdown />
          <SchedulesDivisionsDropdown />
          <SchedulesWeekScheduleDropdown />
        </div>
        <SheduleWeekList />
      </main>
    </div>
  )
}

export default SchedulesPage
