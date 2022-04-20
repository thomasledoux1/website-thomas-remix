import Navigation from './Navigation'
import Footer from './Footer'

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({children}: LayoutProps) => (
  <>
    <Navigation />
    <main className="pt-16 flex-grow flex flex-col justify-center transition-colors dark:bg-lightgrey">
      {children}
    </main>
    <Footer />
  </>
)

export default Layout
