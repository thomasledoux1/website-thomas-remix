import {MetaFunction} from 'remix'
import type {LinksFunction} from 'remix'
import TimelineItem from '../components/TimelineItem'

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: '/me.webp',
    as: 'image',
  },
]

export const meta: MetaFunction = () => ({
  title: 'Thomas Ledoux | CV',
  description: "Thomas Ledoux' CV",
  'twitter:title': 'Thomas Ledoux | CV',
  'twitter:description': "Thomas Ledoux' CV",
  'og:title': 'Thomas Ledoux | CV',
  'og:description': "Thomas Ledoux' CV",
})

const CV = () => {
  const age = Math.floor(
    (new Date().getTime() - new Date('1991-07-11').getTime()) / 3.15576e10,
  )
  const technologies = [
    {name: 'React', numberOfStars: 4},
    {name: 'Vue.js', numberOfStars: 2},
    {name: 'Angular', numberOfStars: 2},
    {name: 'Gatsby.js', numberOfStars: 3},
    {name: 'Next.js', numberOfStars: 4},
    {name: 'React Native', numberOfStars: 3},
    {name: 'Swift', numberOfStars: 2},
    {name: 'Wordpress', numberOfStars: 3},
    {name: 'ES6', numberOfStars: 4},
    {name: 'HTML', numberOfStars: 5},
    {name: 'CSS', numberOfStars: 4},
  ]
  const renderStars = (amount: number) =>
    // @ts-ignore
    // eslint-disable-next-line prefer-spread
    Array.apply(null, {length: 5}).map((_, i) => (
      <span
        className={`star ${i < amount ? 'text-primary' : 'text-white'}`}
        // eslint-disable-next-line react/no-array-index-key
        key={i}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          width="192"
          height="192"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none" />
          <path
            d="M132.4,190.7l50.4,32c6.5,4.1,14.5-2,12.6-9.5l-14.6-57.4a8.7,8.7,0,0,1,2.9-8.8l45.2-37.7c5.9-4.9,2.9-14.8-4.8-15.3l-59-3.8a8.3,8.3,0,0,1-7.3-5.4l-22-55.4a8.3,8.3,0,0,0-15.6,0l-22,55.4a8.3,8.3,0,0,1-7.3,5.4L31.9,94c-7.7.5-10.7,10.4-4.8,15.3L72.3,147a8.7,8.7,0,0,1,2.9,8.8L61.7,209c-2.3,9,7.3,16.3,15,11.4l46.9-29.7A8.2,8.2,0,0,1,132.4,190.7Z"
            fill="currentColor"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      </span>
    ))

  return (
    <section id="cv" className="text-text my-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 sm:gap-16">
        <div className="col-span-1">
          <div className="text-center">
            <img
              className="rounded-full"
              alt="Profile"
              src="/me.webp"
              width={640}
              height={640}
            />
            <p className="mt-4">Hello, is it me you&apos;re looking for?</p>
          </div>
        </div>
        <div className="col-span-1 mt-6 sm:mt-0 sm:col-span-2 flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl mb-4 font-bold">
            A bit about me
          </h1>
          <div>
            <p>
              Hi, I&apos;m Thomas. I&apos;m {age} years old, living in Ghent.
              I&apos;m a professional Frontend Developer, currently working at{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="link"
                href="https://www.the-reference.be"
              >
                The Reference
              </a>
              .
            </p>
            <p>
              What I like most about Frontend development is the ever-changing
              technology. New frameworks being released daily (one better than
              the other...), constant improvements to existing frameworks,
              yearly new features in ECMAScript..
            </p>
            <p>
              I&apos;m always eager to discover the latest updates, apps,
              technologies..!
            </p>
          </div>
        </div>
        <div className="col-span-1 mt-6 sm:mt-0">
          <h2 className="text-xl lg:text-2xl mb-4 font-bold">Technologies</h2>
          {technologies.map(technology => (
            <div key={technology.name} className="flex justify-between mb-4">
              <div>{technology.name}</div>
              <div className="flex">
                {renderStars(technology.numberOfStars)}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1 mt-6 sm:mt-0 sm:col-span-2">
          <h2 className="text-xl lg:text-2xl mb-4 font-bold">My timeline</h2>
          <div className="flex w-full flex-col timeline-container relative after:bg-lightpurple dark:after:bg-darkgrey after:absolute after:w-1 after:h-full">
            <TimelineItem index={0}>
              <time className="text-xs text-grey">October 2018 - now</time>
              <p>
                Frontend Developer at{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  href="https://reference.be"
                >
                  The Reference
                </a>
                , Ghent
              </p>
            </TimelineItem>
            <TimelineItem index={1}>
              <time className="text-xs text-grey">
                September 2017 - October 2018
              </time>
              <p>
                Full Stack Developer at{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  href="https://happsdevelopment.com"
                >
                  Happs Development
                </a>
                , Ghent
              </p>
            </TimelineItem>
            <TimelineItem index={2}>
              <time className="text-xs text-grey">
                February 2017 - June 2017
              </time>
              <p>
                Internship as Swift Developer at{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  href="https://getrialto.com"
                >
                  Rialto
                </a>
                , Ghent
              </p>
            </TimelineItem>
            <TimelineItem index={3}>
              <time className="text-xs text-grey">
                September 2014 - June 2017
              </time>
              <p>
                Bachelor Applied Computer Sciences at{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  href="https://hogent.be"
                >
                  Hogeschool Gent
                </a>
              </p>
            </TimelineItem>
            <TimelineItem index={4}>
              <time className="text-xs text-grey">May 2012 - August 2014</time>
              <p>
                Support Engineer at{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  href="https://telenet.be"
                >
                  Telenet
                </a>
                , Lochristi
              </p>
            </TimelineItem>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CV
