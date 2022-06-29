import Head from 'next/head'
import Header from '../components/homePage/Header'
import Tables from '../components/tablesPage/Tables'
import CommonBanner from '../components/commonComponents/CommonBanner'

import image from '../images/table-bg.jpg'
import WeekScheduleDropdown from '../components/schedulePage/lists/SchedulesSeasonsDropdown'

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
        <WeekScheduleDropdown />
        <Tables />
      </main>
    </div>
  )
}

export default TablePage
