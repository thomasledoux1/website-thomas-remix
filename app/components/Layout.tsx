import Navigation from './Navigation';
import Footer from './Footer';
import { useEffect, useState } from 'react';

type LayoutProps = {
  children: JSX.Element;
  mobileNavOpen: boolean;
  setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Layout = ({ children, mobileNavOpen, setMobileNavOpen }: LayoutProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = () => setIsDarkTheme(!isDarkTheme);
  return (
    <div className={`wrapper ${isDarkTheme ? 'dark' : ''}`}>
      <Navigation
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        isDarkTheme={isDarkTheme}
        toggleDarkTheme={toggleDarkTheme}
      />
      <main className="py-16 px-8 lg:px-16 dark:bg-lightgrey">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
