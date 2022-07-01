import Head from 'next/head'
import Header from '../components/homePage/Header'
import TemplateTables from '../components/tablesPage/TemplateTables'
import CommonBanner from '../components/commonComponents/CommonBanner'

import image from '../images/table-bg.jpg'
import WeekScheduleDropdown from '../components/commonComponents/lists/SchedulesSeasonsDropdown'
import SchedulesSeasonsDropdown from '../components/commonComponents/lists/SchedulesSeasonsDropdown'
import SchedulesDivisionsDropdown from '../components/commonComponents/lists/SchedulesDivisionsDropdown'
import SchedulesWeekScheduleDropdown from '../components/commonComponents/lists/SchedulesWeekScheduleDropdown'
import TablesContainer from '../components/tablesPage/TablesContainer'

function TablePage() {
  return (
    <div className="h-screen ">
      <Head>
        <title>Adult Soccer Tables</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      <Header />
      <main className="relative pb-4 md:pb-10">
        <CommonBanner image={image} title="Tables" />
        <div className="mt-4 flex flex-col sm:mt-8 sm:flex-row sm:justify-center sm:gap-10">
          <SchedulesSeasonsDropdown />
          <SchedulesDivisionsDropdown />
          <SchedulesWeekScheduleDropdown />
        </div>
        {/* <TemplateTables /> */}
        <TablesContainer />
      </main>
    </div>
  )
}

export default TablePage
