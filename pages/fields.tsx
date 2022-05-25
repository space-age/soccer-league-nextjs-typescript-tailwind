import Head from 'next/head'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'
import image from '../images/fields-bg.jpg'
import FieldContainer from '../components/fieldsPage/FieldContainer'

function Fields() {
  return (
    <div className="relative h-screen lg:h-[140vh]">
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pb-4 md:pb-10">
        <CommonBanner image={image} title="Fields" />
        <FieldContainer />
      </main>
    </div>
  )
}

export default Fields
