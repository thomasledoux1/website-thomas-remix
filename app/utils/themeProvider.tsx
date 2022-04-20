/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import type {Dispatch, ReactNode, SetStateAction} from 'react'
import {useFetcher} from 'remix'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>]

const prefersDarkMQ = '(prefers-color-scheme: dark)'
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT

const clientThemeCode = `
  // hi there dear reader 👋
  // this is how I make certain we avoid a flash of the wrong theme. If you select
  // a theme, then I'll know what you want in the future and you'll not see this
  // script anymore.
  ;(() => {
    const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
      ? 'dark'
      : 'light';
    const cl = document.documentElement.classList;
    const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
    if (themeAlreadyApplied) {
      // this script shouldn't exist if the theme is already applied!
      console.warn(
        "Hi there, could you let me know you're seeing this message? Thanks!",
      );
    } else {
      cl.add(theme);
    }
    const meta = document.querySelector('meta[name=color-scheme]');
    if (meta) {
      if (theme === 'dark') {
        meta.content = 'dark light';
      } else if (theme === 'light') {
        meta.content = 'light dark';
      }
    } else {
      console.warn(
        "Hey, could you let me know you're seeing this message? Thanks!",
      );
    }
  })();
  `

function NonFlashOfWrongThemeEls({ssrTheme}: {ssrTheme: boolean}) {
  const [theme] = useState<Theme | null>(null)
  return (
    <>
      <meta
        name="color-scheme"
        content={theme === 'light' ? 'light dark' : 'dark light'}
      />
      {ssrTheme ? null : (
        // eslint-disable-next-line react/no-danger
        <script dangerouslySetInnerHTML={{__html: clientThemeCode}} />
      )}
    </>
  )
}

const themes: Array<Theme> = Object.values(Theme)

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && themes.includes(value as Theme)
}

function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: ReactNode
  specifiedTheme: Theme | null
}) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme
      }
      return null
    }
    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof window !== 'object') {
      return null
    }

    return getPreferredTheme()
  })
  const persistTheme = useFetcher()

  // TODO: remove this when persistTheme is memoized properly
  const persistThemeRef = useRef(persistTheme)
  useEffect(() => {
    persistThemeRef.current = persistTheme
  }, [persistTheme])

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ)
    const handleChange = () => {
      setTheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const mountRun = useRef(false)

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true
      return
    }
    if (!theme) {
      return
    }

    persistThemeRef.current.submit(
      {theme},
      {action: 'action/set-theme', method: 'post'},
    )
  }, [theme])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export {Theme, ThemeProvider, NonFlashOfWrongThemeEls, useTheme, isTheme}
