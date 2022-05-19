import type { NextPage } from 'next'
import Head from 'next/head'
import About from '../components/homePage/About'
import Banner from '../components/homePage/Banner'

import Header from '../components/homePage/Header'

const Home: NextPage = () => {
  return (
    // bg-gradient-to-b from-gray-900/30 to-[#010511]
    <div className="relative h-screen lg:h-[140vh]">
      <Head>
        <title>Soccer League</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative space-y-6 pl-4 pb-24">
        <Banner />
        <section className="space-y-24">
          {/* About */}
          <About />
          <About />
          {/* Subscribe to get notificaiton when new schedule is up */}
        </section>
      </main>
    </div>
  )
}

export default Home
