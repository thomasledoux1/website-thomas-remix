import {Link, NavLink, useLocation} from '@remix-run/react'
// eslint-disable-next-line no-use-before-define
import React from 'react'

type NavigationProps = {
  theme: string
}

const Navigation = ({theme}: NavigationProps) => {
  const oppositeTheme = theme === 'light' ? 'dark' : 'light'
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const location = useLocation()
  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])
  const renderNavigationItems = () => {
    const linkClasses =
      'relative before:absolute before:bottom-[-6px] md:before:bottom-[-4px] before:h-[4px] before:w-[0] before:mt-[4px] before:bg-white md:before:bg-primary before:transition-all before:duration-300'
    return (
      <>
        <li>
          <NavLink to="/personal" className={linkClasses}>
            Personal
          </NavLink>
        </li>
        <li>
          <NavLink to="/portfolio" className={linkClasses}>
            Portfolio
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" className={linkClasses}>
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={linkClasses}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/cv" className={linkClasses}>
            CV
          </NavLink>
        </li>
      </>
    )
  }

  const LogoLetter = ({letter}: {letter: string}) => (
    <span className="letter inline-block top-0 relative">{letter}</span>
  )

  return (
    <>
      <nav className="fixed bg-purple dark:bg-darkgrey text-text h-16 w-full z-50">
        <div className="flex h-full container mx-auto justify-between items-center px-4 lg:px-16">
          <Link className="logo flex flex-row text-lg lg:text-2xl" to="/">
            <LogoLetter letter="t" />
            <LogoLetter letter="h" />
            <LogoLetter letter="o" />
            <LogoLetter letter="m" />
            <LogoLetter letter="a" />
            <LogoLetter letter="s" />
            <span>&nbsp;</span>
            <LogoLetter letter="l" />
            <LogoLetter letter="e" />
            <LogoLetter letter="d" />
            <LogoLetter letter="o" />
            <LogoLetter letter="u" />
            <LogoLetter letter="x" />
          </Link>
          <ul className="hidden md:flex md:gap-6">{renderNavigationItems()}</ul>
          <ul
            className={`md:hidden absolute flex flex-col w-full top-16 left-0 py-4 transition-transform items-center text-white bg-primary transform gap-4 ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {renderNavigationItems()}
          </ul>
          <button
            aria-label="Toggle mobile menu"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden order-3 cursor-pointer relative w-5 h-6"
          >
            <span
              className={`transform transition-transform duration-300 absolute h-1 w-full bg-primary rounded-lg left-0 ${
                mobileMenuOpen ? 'rotate-135 top-3' : 'rotate-0 top-1'
              }`}
            />
            <span
              className={`absolute transition-opacity duration-300 h-1 w-full bg-primary rounded-lg left-0 top-3 ${
                mobileMenuOpen ? 'opacity-0 -left-[10rem]' : 'opacity-100'
              }`}
            />
            <span
              className={`transform transition-transform duration-300 absolute h-1 w-full bg-primary rounded-lg left-0 ${
                mobileMenuOpen ? '-rotate-135 top-3' : 'rotate-0 top-5'
              }`}
            />
          </button>
          <form method="post" action="/">
            <input name="theme" type="hidden" value={oppositeTheme} />
            <input name="returnUrl" type="hidden" value={location.pathname} />
            <button
              aria-label="Toggle Dark Mode"
              type="submit"
              id="darkModeToggle"
              className="inset-0 overflow-hidden order-2 md:order-3 absolute md:relative md:top-auto md:translate-x-0 md:translate-y-0 w-8 h-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-0"
            >
              <div className="relative group h-full">
                <span className="absolute inset-0 hidden dark:inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-gray-800 dark:text-gray-200  transition-[fill] dark:group-hover:text-yellow"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 inline-block dark:hidden">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    className="text-gray-800  dark:text-gray-200 transition-[fill] group-hover:text-yellow"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </span>
              </div>
            </button>
          </form>
        </div>
      </nav>
    </>
  )
}

export default Navigation
