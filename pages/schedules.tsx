import Head from 'next/head'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'
import SheduleWeekList from '../components/schedulePage/SheduleWeekList'
import CommonFooter from '../components/commonComponents/CommonFooter'
import image from '../images/schedules-bg.jpg'

function Schedules() {
  return (
    <div className="h-screen ">
      <Head>
        <title>Soccer Schedules</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pb-4 md:pb-10">
        <CommonBanner image={image} title="schedules" />
        <SheduleWeekList />
      </main>
      <CommonFooter />
    </div>
  )
}

export default Schedules
