import {Link, NavLink, useLocation} from '@remix-run/react'

type NavigationProps = {
  theme: string
}

const Navigation = ({theme}: NavigationProps) => {
  const oppositeTheme = theme === 'light' ? 'dark' : 'light'
  const location = useLocation()
  const renderNavigationItems = () => {
    const linkClasses =
      'relative before:absolute before:bottom-[-5px] before:h-[5px] before:w-[0] before:mt-[5px] before:bg-primary before:transition-all before:duration-300'
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
      <nav className="fixed bg-purple  dark:bg-darkgrey text-text h-16 w-full z-50">
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
            className="md:hidden absolute flex flex-col w-full top-16 left-0 py-4 items-center text-white bg-primary transform gap-4 transition-transform"
            id="mobileNavigation"
          >
            {renderNavigationItems()}
          </ul>
          <button
            aria-label="Toggle mobile menu"
            type="button"
            id="mobileNavigationToggle"
            className="md:hidden order-3 cursor-pointer relative w-5 h-6"
          >
            <span className="transform transition-transform duration-300 absolute h-1 w-full bg-primary rounded-lg left-0 top-1 rotate-0" />
            <span className="absolute transition-opacity duration-300 h-1 w-full bg-primary rounded-lg left-0 top-3" />
            <span className="transform transition-transform duration-300 absolute h-1 w-full bg-primary rounded-lg left-0" />
          </button>
          <form method="post" action="/">
            <input name="theme" type="hidden" value={oppositeTheme} />
            <input name="returnUrl" type="hidden" value={location.pathname} />
            <button
              aria-label="Toggle Dark Mode"
              type="submit"
              id="darkModeToggle"
              className="p-3 h-12 w-12 order-2 md:order-3 absolute left-2/4 transform -translate-x-2/4 md:translate-x-0 lg:transform-none md:relative md:left-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="h-6 w-6 text-gray-800  dark:text-gray-200"
              >
                {theme !== 'light' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            </button>
          </form>
        </div>
      </nav>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        document.getElementById('mobileNavigationToggle').addEventListener('click', function() {
          this.classList.toggle('open')
          document.getElementById('mobileNavigation').classList.toggle('open')
        })
        document.getElementById('darkModeToggle').addEventListener('click', function() {
          const wrapper = document.getElementById('wrapper')
          if (!wrapper.classList.contains('dark')) {
            this.querySelector('svg').innerHTML = '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>'
          } else {
            this.querySelector('svg').innerHTML = '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />'
          } 
          wrapper.classList.toggle('dark')
        })
      `,
        }}
      />
    </>
  )
}

export default Navigation
