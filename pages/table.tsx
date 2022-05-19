import Head from 'next/head'
import Header from '../components/homePage/Header'

function Table() {
  return (
    <div className="relative h-screen lg:h-[140vh]">
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  )
}

export default Table
