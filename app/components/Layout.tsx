import Navigation from './Navigation'
import Footer from './Footer'

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({children}: LayoutProps) => (
  <div id="wrapper" className="wrapper flex flex-col">
    <Navigation />
    <main className="pt-16 px-8 flex-grow flex flex-col justify-center lg:px-16 transition-colors dark:bg-lightgrey">
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout
