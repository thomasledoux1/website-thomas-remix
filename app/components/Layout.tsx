import Navigation from './Navigation'
import Footer from './Footer'

type LayoutProps = {
  children: JSX.Element
  theme: string
}

const Layout = ({children, theme}: LayoutProps) => {
  console.log(theme)
  return (
    <div id="wrapper" className={`wrapper flex flex-col ${theme}`}>
      <Navigation theme={theme} />
      <main className="pt-16 px-8 flex-grow flex flex-col justify-center lg:px-16 transition-colors dark:bg-lightgrey">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
