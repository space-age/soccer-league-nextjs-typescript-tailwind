import Head from 'next/head'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'
import image from '../images/fields-bg.jpg'
import FieldContainer from '../components/fieldsPage/FieldContainer'

function FieldsPage() {
  return (
    <div className="relative h-screen">
      <Head>
        <title>Adult Soccer Fields</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      <Header />
      <main className="relative pb-4 md:pb-10">
        <CommonBanner image={image} title="Fields" />
        <FieldContainer />
      </main>
    </div>
  )
}

export default FieldsPage
