import Link from 'next/link'
import { useEffect, useState } from 'react'
import BasicMenu from './BasicMenu'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

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
      {/* <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
      </div> */}

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
    </header>
  )
}

export default Header
