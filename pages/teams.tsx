import Head from 'next/head'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'

import image from '../images/teams-bg.jpg'
import Team from '../components/teamsPage/Team'

function TeamsPage() {
  return (
    <div className="h-screen ">
      <Head>
        <title>Adult Soccer Tables</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      <Header />
      <main className="relative pb-4 md:pb-10">
        <CommonBanner image={image} title="Teams" />
        <Team />
      </main>
    </div>
  )
}

export default TeamsPage
