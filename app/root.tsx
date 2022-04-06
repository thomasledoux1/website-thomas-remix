// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import {
  ActionFunction,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  MetaFunction,
  redirect,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
  useOutlet,
} from 'remix'
import type {LinksFunction} from 'remix'
import {AnimatePresence, motion} from 'framer-motion'

import global from './styles/global.css'
import tailwindUrl from './styles/tailwind.css'
import Layout from './components/Layout'
import {parseCookie} from './utils/parseCookie'
import {theme} from './cookie'

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: global},
  {rel: 'stylesheet', href: tailwindUrl},
]

export const loader: LoaderFunction = async ({request}) => {
  const cookie = await parseCookie(request, theme)
  if (!cookie.theme) cookie.theme = 'light'
  return {theme: cookie.theme}
}

export const action: ActionFunction = async ({request}) => {
  const cookie = await parseCookie(request, theme)
  const formData = await request.formData()
  cookie.theme = formData.get('theme') || cookie.theme || 'light'
  const returnUrl = formData.get('returnUrl') || '/'
  const serializedCookie = await theme.serialize(cookie)
  return redirect(returnUrl.toString(), {
    headers: {
      'Set-Cookie': serializedCookie,
    },
  })
}

export const meta: MetaFunction = () => ({
  'twitter:card': 'summary',
  'twitter:image': 'https://thomasledoux.be/me.jpeg',
  'og:image': 'https://thomasledoux.be/me.jpeg',
})

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function App() {
  const cookie = useLoaderData()
  const outlet = useOutlet()
  return (
    // eslint-disable-next-line no-use-before-define
    <Document>
      <Scripts />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-125864873-1"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-125864873-1');`,
        }}
      />
      <Layout theme={cookie.theme}>
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.main
            key={useLocation().key}
            initial={{x: '-10%', opacity: 0}}
            animate={{x: '0', opacity: 1}}
            exit={{y: '-10%', opacity: 0}}
            transition={{duration: 0.3}}
          >
            {outlet}
          </motion.main>
        </AnimatePresence>
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/* eslint-disable-next-line no-use-before-define */}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout theme="light">
        <>
          <h1>
            {caught.status}: {caught.statusText}
          </h1>
          {message}
        </>
      </Layout>
    </Document>
  )
}

export function ErrorBoundary({error}: {error: Error}) {
  console.error(error)
  return (
    <Document title="Error!">
      <Layout theme="light">
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Please try again later</p>
        </div>
      </Layout>
    </Document>
  )
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
  const [hydrated, setHydrated] = React.useState(false)
  const [innerHtml, setInnerHtml] = React.useState('')
  const location = useLocation()

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  const firstRenderRef = React.useRef(true)
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    const pageTitle = location.pathname === '/' ? 'Home page' : document.title
    setInnerHtml(`Navigated to ${pageTitle}`)
  }, [location.pathname])

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: '0',
        clipPath: 'inset(100%)',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }}
    >
      {innerHtml}
    </div>
  )
})
