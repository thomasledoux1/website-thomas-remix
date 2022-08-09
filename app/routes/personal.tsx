// eslint-disable-next-line no-use-before-define
import type {MetaFunction} from '@remix-run/node'
import {Link} from '@remix-run/react'
// eslint-disable-next-line no-use-before-define
import React from 'react'

export const meta: MetaFunction = () => ({
  title: 'Thomas Ledoux | Personal',
  description: 'Personal information about Thomas Ledoux',
  'twitter:title': 'Thomas Ledoux | Personal',
  'twitter:description': 'Personal information about Thomas Ledoux',
  'og:title': 'Thomas Ledoux | Personal',
  'og:description': 'Personal information about Thomas Ledoux',
})

const Personal = () => {
  const [isShortVersion, setIsShortVersion] = React.useState(true)
  const age = Math.floor(
    (new Date().getTime() - new Date('1991-07-11').getTime()) / 3.15576e10,
  )
  return (
    <section
      className="container mx-auto px-4 lg:px-16 my-8 lg:my-0 text-text dark:text-black"
      id="personal"
    >
      <div className="flex flex-col gap-y-8 md:grid md:grid-cols-2 md:gap-8 items-center content-center">
        <img
          width={194}
          height={150}
          className="min-h-[66.66%] min-w-[66.66%] mx-auto"
          alt="Illustration of me working on laptop"
          src="/personal.svg"
        />
        <div className="bg-purple rounded-lg p-6">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <button
              className="px-4 w-fit py-2 bg-primary text-white rounded-lg lg:hidden"
              type="button"
              onClick={() => setIsShortVersion(!isShortVersion)}
            >
              {isShortVersion ? 'Read long version' : 'Read short version'}
            </button>
            <p>
              Hi, I&apos;m Thomas. I&apos;m {age} years old, living in Ghent.
              <br />
              I&apos;m a professional <b>Frontend Developer</b>, currently
              working at The Reference.
            </p>

            <div className={isShortVersion ? 'hidden lg:block' : ''}>
              <p>
                In general I really love to travel. My favourite kind of holiday
                is a roadtrip with a campervan, doing lots of hikes in nature
                and going for a swim in the sea at the end of the day!
                <br />
                When I&apos;m not traveling I like to sport a lot. I play
                badminton, cycle a lot, and I go for the occasional run.
              </p>
              <p>
                I studied Applied Computer Sciences at Hogeschool Gent. I chose
                the Mobile Development track, and went on Erasmus to Barcelona
                to learn more about Swift and Java. <br />
                After graduating I worked for the startup Happs as a full-stack
                developer, where I created and maintained the website. <br />I
                also created an app for a client in React Native during this
                period.
              </p>
              <p>
                You can read more about my work in the{' '}
                <Link className="link" to="/portfolio">
                  portfolio
                </Link>{' '}
                section .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Personal
