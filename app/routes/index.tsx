import type {LinksFunction, MetaFunction} from '@remix-run/node'
import {Link} from '@remix-run/react'

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: '/me-mobile.webp',
    as: 'image',
    media: '(max-width: 640px)',
  },
  {
    rel: 'preload',
    href: '/me.webp',
    as: 'image',
    media: '(min-width: 641px)',
  },
]

export const meta: MetaFunction = () => ({
  title: 'Thomas Ledoux | Home',
  description: "Thomas Ledoux' personal website",
  'twitter:title': 'Thomas Ledoux | Home',
  'twitter:description': "Thomas Ledoux' personal website",
  'og:title': 'Thomas Ledoux | Home',
  'og:description': "Thomas Ledoux' personal website",
})

export default function Index() {
  return (
    <section
      id="hero"
      className="container mx-auto relative lg:pt-0 items-center content-center flex text-text"
    >
      <div className="gap-8 md:gap-0 grid md:grid-cols-2 items-center content-center justify-items-center">
        <h1 className="text-4xl font-bold md:text-6xl flex flex-col items-center md:items-start">
          <span>Thomas is a</span>
          <Link className="animate-title-part1" to="/portfolio">
            developer
          </Link>
          <Link className="animate-title-part2" to="/personal">
            cyclist
          </Link>
          <Link className="animate-title-part3" to="/personal">
            travel lover
          </Link>
        </h1>
        <div className="w-3/4">
          <img
            className="rounded-full"
            alt="Profile"
            src="/me.webp"
            width={640}
            height={640}
            sizes="(max-width: 600px) 320px, 800px"
            srcSet="/me-mobile.webp 320w, /me.webp 640w"
          />
        </div>
      </div>
    </section>
  )
}
