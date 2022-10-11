import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { messagedView } from '../atoms/mainPageAtoms'
import Banner from '../components/homePage/Banner'
import GameCancelModal from '../components/homePage/GameCancelModal'
import Header from '../components/homePage/Header'

const Home: NextPage = () => {
  const cancelGameMessage = useRecoilValue(messagedView) //boolean to check if cancel game message has been viewed

  return (
    <div className="relative h-full lg:h-[100vh]">
      <Head>
        <title>Adult Soccer League</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      {/* Main Header with links */}
      <Header />
      <main className="relative space-y-6 pl-2 sm:pl-4">
        {/* if cancel game message has not been viewed by user, then display the modal */}
        {!cancelGameMessage && <GameCancelModal />}
        <Banner />
      </main>
    </div>
  )
}

export default Home
