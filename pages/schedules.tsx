import Head from 'next/head'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'
import image from '../images/schedules-bg.jpg'
import SchedulesSeasonsDropdown from '../components/commonComponents/lists/SchedulesSeasonsDropdown'
import SchedulesDivisionsDropdown from '../components/commonComponents/lists/SchedulesDivisionsDropdown'
import SchedulesWeekScheduleDropdown from '../components/commonComponents/lists/SchedulesWeekScheduleDropdown'
import SheduleWeekListContainer from '../components/schedulePage/SheduleWeekListContainer'
import GameCancelModal from '../components/homePage/GameCancelModal'
import { useRecoilValue } from 'recoil'
import { messagedView } from '../atoms/mainPageAtoms'

/**
 * /schedules page. Displays the games schedules after selecting season->divison->week schedule
 * On first render, displays the latest games week schedules, by which schedule has latest date
 * @returns week schedule games
 */
function SchedulesPage() {
  const cancelGameMessage = useRecoilValue(messagedView) //boolean to check if cancel game message has been viewed
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
          <SchedulesSeasonsDropdown stage={'season'} />
          <SchedulesDivisionsDropdown stage={'season'} />
          <SchedulesWeekScheduleDropdown />
        </div>
        <SheduleWeekListContainer />
        {/* if cancel game message has not been viewed by user, then display the modal */}
        {!cancelGameMessage && <GameCancelModal />}
      </main>
    </div>
  )
}

export default SchedulesPage
