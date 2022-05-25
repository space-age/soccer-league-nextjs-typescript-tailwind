import type { NextPage } from 'next'
import Head from 'next/head'
import About from '../components/homePage/About'
import Banner from '../components/homePage/Banner'

import Header from '../components/homePage/Header'

const Home: NextPage = () => {
  return (
    // bg-gradient-to-b from-gray-900/30 to-[#010511]
    <div className="relative h-full lg:h-[100vh]">
      <Head>
        <title>Adult Soccer League</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      <Header />
      <main className="relative space-y-6 pl-4">
        <Banner />
        {/* <section className="space-y-24">
          {/* About */}
        {/* <About />
          <About /> */}
        {/* Subscribe to get notificaiton when new schedule is up */}
        {/* </section> */}
      </main>
    </div>
  )
}

export default Home
