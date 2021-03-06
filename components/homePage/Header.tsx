import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import BasicMenu from './BasicMenu'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()

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
      {/* Basic Menu for Smaller Screens */}
      <BasicMenu isScrolled={isScrolled} />

      <div className=" sm:headerBorder hidden sm:block">
        <ul className="flex items-center gap-1 space-x-1 px-2  md:gap-5">
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
