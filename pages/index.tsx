import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { messagedView } from '../atoms/mainPageAtoms'
// import About from '../components/homePage/About'
import Banner from '../components/homePage/Banner'
import GameCancelModal from '../components/homePage/GameCancelModal'

import Header from '../components/homePage/Header'

const Home: NextPage = () => {
  const cancelGameMessage = useRecoilValue(messagedView)
  return (
    <div className="relative h-full lg:h-[100vh]">
      <Head>
        <title>Adult Soccer League</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      <Header />
      <main className="relative space-y-6 pl-2 sm:pl-4">
        {!cancelGameMessage && <GameCancelModal />}
        <Banner />
        {/* <section className="space-y-24">
          {/* About */}
        {/* Subscribe to get notificaiton when new schedule is up */}
        {/* </section> */}
      </main>
    </div>
  )
}

export default Home
