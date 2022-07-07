import Head from 'next/head'
import React from 'react'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'
import image from '../images/t.jpg'
import SchedulesSeasonsDropdown from '../components/commonComponents/lists/SchedulesSeasonsDropdown'
import SchedulesDivisionsDropdown from '../components/commonComponents/lists/SchedulesDivisionsDropdown'
import SchedulesWeekScheduleDropdown from '../components/commonComponents/lists/SchedulesWeekScheduleDropdown'
import PlayoffsBracketsDropdown from '../components/commonComponents/lists/PlayoffsBracketsDropdown'
import PlayoffContainer from '../components/playoffsPage/largerScreens/PlayoffContainer'
import PlayoffContainerMobile from '../components/playoffsPage/smallerScreens/PlayoffContainerMobile'

function playoffs() {
  return (
    <div className="h-screen ">
      <Head>
        <title>Adult Soccer Tables</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      <Header />
      <main className="relative pb-4 md:pb-10">
        <CommonBanner image={image} title="Playoffs" />
        <div className="mt-4 flex flex-col sm:mt-8 sm:flex-row sm:justify-center sm:gap-10">
          <SchedulesSeasonsDropdown stage={'playoffs'} />
          <SchedulesDivisionsDropdown stage={'playoffs'} />
          <PlayoffsBracketsDropdown />
        </div>
        <PlayoffContainerMobile />
        <PlayoffContainer />
      </main>
    </div>
  )
}

export default playoffs
