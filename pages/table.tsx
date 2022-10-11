import Head from 'next/head'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'

import image from '../images/table-bg.jpg'
import SchedulesSeasonsDropdown from '../components/commonComponents/lists/SchedulesSeasonsDropdown'
import SchedulesDivisionsDropdown from '../components/commonComponents/lists/SchedulesDivisionsDropdown'
import SchedulesWeekScheduleDropdown from '../components/commonComponents/lists/SchedulesWeekScheduleDropdown'
import TablesContainer from '../components/tablesPage/TablesContainer'

/**
 * /table page. Displays the table, positioning of teams in the table, according the season->division->week schedule chosen
 * @returns table of team position in the league
 */
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
          <SchedulesSeasonsDropdown stage={'season'} />
          <SchedulesDivisionsDropdown stage={'season'} />
          <SchedulesWeekScheduleDropdown />
        </div>
        <TablesContainer />
      </main>
    </div>
  )
}

export default TablePage
