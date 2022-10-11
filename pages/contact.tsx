import Head from 'next/head'
import Header from '../components/homePage/Header'
import CommonBanner from '../components/commonComponents/CommonBanner'
import Contact from '../components/contactPage/Contact'

import image from '../images/contact-bg.jpg'

/**
 * .contact/ page. Displays the contact us information, and team and play registration fees
 * @returns contact page
 */
function ContactPage() {
  return (
    <div className="relative h-screen ">
      <Head>
        <title>Adult Soccer Contact</title>
        <link rel="icon" href="/ball.png" />
      </Head>
      <Header />
      <main className="relative ">
        <CommonBanner image={image} title="Contact Us" />
        <Contact />
      </main>
    </div>
  )
}

export default ContactPage
