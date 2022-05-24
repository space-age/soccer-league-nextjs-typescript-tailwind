import Head from 'next/head'
import Header from '../components/homePage/Header'
import Tables from '../components/tablesPage/Tables'
import CommonBanner from '../components/commonComponents/CommonBanner'
import TabsNavigation from '../components/tablesPage/Tabs/TabsNavigation'
import CommonFooter from '../components/commonComponents/CommonFooter'

import image from '../images/table-bg.jpg'

function Table() {
  return (
    <div className="h-screen ">
      <Head>
        <title>Soccer Tables</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pb-4 md:pb-10">
        <CommonBanner image={image} title="Tables" />
        {/* <TabsNavigation /> */}
        <Tables />
      </main>
      <CommonFooter />
    </div>
  )
}

export default Table
