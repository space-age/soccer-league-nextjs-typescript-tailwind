import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import BasicMenu from './BasicMenu'

/**
 * Main Header for the website. Re-usable for all pages in the application
 * Header with links to different pages.
 * If user logged in the portal, then display the option to go back to portal when in main web page
 * and a button to logout of the portal without needing to route back to portal
 */
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()

  /**
   * Runs only on the first render
   * Creates an event listner for scroll events
   * If the window scroll y is grater than zero, meaning that the window has been scrolled down
   * Then set the state isScrolled to true, will change the header colors
   */
  useEffect(() => {
    const handlerScroll = () => {
      //if window scrolled in y-direction beyond 0
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // event listner to listen for scroll evvents, and if any call function
    window.addEventListener('scroll', handlerScroll)

    // Cleaner
    return () => window.removeEventListener('scroll', handlerScroll)
  }, [])

  return (
    <header className={`${isScrolled ? 'bg-[#263238]' : 'bg-[#fafafa]'}`}>
      {/* If user is logged in the portal, then display the container with a link to go back to Portal */}
      {user && (
        <div className="mr-10 !hidden  items-center space-x-10 justify-self-start  border-2 p-2 hover:bg-slate-600 xl:!flex">
          <Link href="/master-creator">
            <p
              className={`${
                isScrolled ? 'text-white' : 'text-black'
              } cursor-pointer text-3xl font-semibold  hover:text-[white]`}
            >
              Creator Mode
            </p>
          </Link>
        </div>
      )}

      {/* Basic Menu for Smaller Screens, and passes in the state isSrolled to give different styling to page */}
      <BasicMenu isScrolled={isScrolled} />

      {/* Container for the Links in the Header */}
      <div className=" sm:headerBorder hidden sm:block">
        <ul className="flex items-center gap-1 space-x-1 px-2  md:gap-5">
          {/* Home page link */}
          <Link href="/">
            <p
              className={`${
                isScrolled
                  ? 'headerLinkScrolled'
                  : 'headerLinkScrolled headerLink'
              }`}
            >
              Home
            </p>
          </Link>
          <li className="headerSlash">/</li>

          {/* Schedules page link */}
          <Link href="/schedules">
            <p
              className={`${
                isScrolled
                  ? 'headerLinkScrolled'
                  : 'headerLinkScrolled headerLink'
              }`}
            >
              Schedules
            </p>
          </Link>
          <li className="headerSlash">/</li>

          {/* Tables page link */}
          <Link href="/table">
            <p
              className={`${
                isScrolled
                  ? 'headerLinkScrolled'
                  : 'headerLinkScrolled headerLink'
              }`}
            >
              Tables
            </p>
          </Link>
          <li className="headerSlash">/</li>

          {/* Team page link, for now it is an option but Teams page not available yet */}
          {/* <Link href="/teams">
            <p
              className={`${
                isScrolled
                  ? 'headerLinkScrolled'
                  : 'headerLinkScrolled headerLink'
              }`}
            >
              Teams
            </p>
          </Link>
          <li className="headerSlash">/</li> */}

          {/* Playoffs page link */}
          <Link href="/playoffs">
            <p
              className={`${
                isScrolled
                  ? 'headerLinkScrolled'
                  : 'headerLinkScrolled headerLink'
              }`}
            >
              Playoffs
            </p>
          </Link>
          <li className="headerSlash">/</li>

          {/* Fields page link */}
          <Link href="/fields">
            <p
              className={`${
                isScrolled
                  ? 'headerLinkScrolled'
                  : 'headerLinkScrolled headerLink'
              }`}
            >
              Field Location
            </p>
          </Link>
          <li className="headerSlash">/</li>

          {/* Contact page link */}
          <Link href="/contact">
            <p
              className={`${
                isScrolled
                  ? 'headerLinkScrolled'
                  : 'headerLinkScrolled headerLink'
              }`}
            >
              Contact
            </p>
          </Link>
        </ul>
      </div>

      {/* If user is logged in the portal, then display the container with a button to logout of the portal */}
      {user && (
        <div className="ml-10 !hidden items-center space-x-10 justify-self-start border-2 p-2  hover:bg-slate-600 xl:!flex">
          <button
            onClick={logout}
            className={`${
              isScrolled ? 'text-white' : 'text-black'
            } cursor-pointer text-3xl  font-semibold hover:text-[white]`}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
