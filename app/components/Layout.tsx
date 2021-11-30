import Navigation from './Navigation';
import Footer from './Footer';
import { useState } from 'react';

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = () => setIsDarkTheme(!isDarkTheme);
  return (
    <div className={`wrapper ${isDarkTheme ? 'dark' : ''}`}>
      <Navigation isDarkTheme={isDarkTheme} toggleDarkTheme={toggleDarkTheme} />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
