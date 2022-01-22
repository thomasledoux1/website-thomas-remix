// eslint-disable-next-line no-use-before-define
import React from 'react'
import {MetaFunction, useLoaderData} from 'remix'
import {getAccessToken, updateAccessToken} from '../utils/db'

type StatsData = {
  stravaStats: {
    all_run_totals: {
      elevation_gain: number
      distance: number
      moving_time: number
    }
    all_ride_totals: {
      elevation_gain: number
      distance: number
      moving_time: number
    }
    ytd_run_totals: {
      elevation_gain: number
      distance: number
      moving_time: number
    }
    ytd_ride_totals: {
      elevation_gain: number
      distance: number
      moving_time: number
    }
  }
}

export const meta: MetaFunction = () => ({
  title: 'Thomas Ledoux | Stats',
  description: "Thomas Ledoux' Strava stats",
  'twitter:card': 'https://thomasledoux.be/me.jpeg',
  'twitter:title': 'Thomas Ledoux | Stats',
  'twitter:description': "Thomas Ledoux' Strava stats",
  'og:image': 'https://thomasledoux.be/me.jpeg',
  'og:title': 'Thomas Ledoux | Stats',
  'og:description': "Thomas Ledoux' Strava stats",
})

export async function loader() {
  const {refresh_token, id, expiration_token, access_token} =
    await getAccessToken()
  let token = access_token
  if (expiration_token <= Math.round(Date.now() / 1000)) {
    const resToken = await fetch(
      `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.CLIENT_ID_STRAVA}&client_secret=${process.env.CLIENT_SECRET_STRAVA}&grant_type=refresh_token&refresh_token=${refresh_token}`,
      {
        method: 'POST',
      },
    )
    const resTokenJson = await resToken.json()
    const {
      access_token: newToken,
      refresh_token: newRefreshToken,
      expires_at: newTokenExpiration,
    } = resTokenJson
    token = newToken

    updateAccessToken({
      id,
      access_token: newToken,
      refresh_token: newRefreshToken,
      expiration_token: newTokenExpiration,
    })
  }

  const resStats = await fetch(
    'https://www.strava.com/api/v3/athletes/40229513/stats',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  const stravaStats = await resStats.json()
  return {
    stravaStats,
  }
}

const Stats = () => {
  const {stravaStats} = useLoaderData<StatsData>()
  const [showRunning, setShowRunning] = React.useState(false)
  const activeStatsYtd = showRunning
    ? stravaStats.ytd_run_totals
    : stravaStats.ytd_ride_totals
  const activeStatsAllTime = showRunning
    ? stravaStats.all_run_totals
    : stravaStats.all_ride_totals
  const btnClass =
    'px-6 lg:px-8 py-2 lg:py-4 border-4 border-purple flex justify-center cursor-pointer  w-1/2 text-center'
  const btnActiveClass = 'bg-primary text-white border-purple'
  return (
    <section id="stats" className="text-text">
      <div className="container mx-auto flex flex-col items-center justify-center lg:pt-0 w-full">
        <h2 className="text-center text-2xl mb-6 font-bold">My Strava stats</h2>
        <div className="flex flex-col gap-6 w-full lg:mx-auto relative md:w-1/2 lg:max-w-md text-center md:text-left">
          <div className="flex rounded-full self-center">
            <button
              aria-label="Toggle bike mode"
              type="button"
              className={`${btnClass} rounded-tl-full rounded-bl-full border-r-0 ${
                !showRunning ? btnActiveClass : ''
              }`}
              onClick={() => setShowRunning(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none" />
                <path
                  d="M208,80a16,16,0,0,0-16-16H152l56,96"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <circle
                  cx="208"
                  cy="160"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <circle
                  cx="48"
                  cy="160"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <polyline
                  points="48 64 76 64 132 160"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <polyline
                  points="170.1 96 94.7 96 48 160"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
            </button>
            <button
              aria-label="Toggle run mode"
              type="button"
              className={`${btnClass} border-l-0 rounded-tr-full rounded-br-full ${
                showRunning ? btnActiveClass : ''
              }`}
              onClick={() => setShowRunning(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="h-10"
              >
                <rect width="256" height="256" fill="none" />
                <circle
                  cx="152"
                  cy="56"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M56,101.6s32-29.6,80,8c50.5,39.4,80,24,80,24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M135.1,108.8C130.7,129.2,101.6,207,32,200"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M110.6,161.2C128.5,165,176,180,176,232"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
            </button>
          </div>
          <div className="border-4 border-purple rounded-xl flex md:flex-row flex-wrap justify-center">
            <div className="px-2 gap-3 py-4 flex flex-col min-w-[50%] text-center">
              <h3 className="font-bold text-xl mb-4">All time</h3>
              <p className="flex items-center justify-center">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="192"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <circle
                    cx="200"
                    cy="200"
                    r="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M72,56h96a32,32,0,0,1,0,64H72a40,40,0,0,0,0,80H176"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                {Math.floor(activeStatsAllTime.distance / 1000)}
                km
              </p>
              <p className="flex items-center justify-center">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="192"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <circle
                    cx="164"
                    cy="52"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M8,200,81.1,75.7a8.1,8.1,0,0,1,13.8,0L168,200Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="50.4"
                    y1="128"
                    x2="125.6"
                    y2="128"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M144.1,159.4l33-55.8a8.1,8.1,0,0,1,13.8,0L248,200H168"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                {activeStatsAllTime.elevation_gain}m
              </p>
              <p className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="192"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <circle
                    cx="128"
                    cy="128"
                    r="96"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="16"
                  />
                  <polyline
                    points="128 72 128 128 184 128"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                {Math.floor(activeStatsAllTime.moving_time / 3600)}h
              </p>
              <p className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="192"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <path
                    d="M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="128"
                    y1="56"
                    x2="128"
                    y2="88"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="27.5"
                    y1="133.1"
                    x2="58.5"
                    y2="141.4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="228.5"
                    y1="133.1"
                    x2="197.5"
                    y2="141.4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="103.4"
                    y1="192"
                    x2="171.8"
                    y2="102.9"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>{' '}
                {(
                  activeStatsAllTime.distance /
                  1000 /
                  (activeStatsAllTime.moving_time / 3600)
                ).toFixed(2)}{' '}
                km/h
              </p>
            </div>
            <div className="px-2 gap-3 py-4 flex flex-col min-w-[50%] text-center">
              <h3 className="font-bold text-xl mb-4">
                {new Date().getFullYear()}
              </h3>
              <p className="flex items-center justify-center">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="192"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <circle
                    cx="200"
                    cy="200"
                    r="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M72,56h96a32,32,0,0,1,0,64H72a40,40,0,0,0,0,80H176"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                {Math.floor(activeStatsYtd.distance / 1000)}
                km
              </p>
              <p className="flex items-center justify-center">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="192"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <circle
                    cx="164"
                    cy="52"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M8,200,81.1,75.7a8.1,8.1,0,0,1,13.8,0L168,200Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="50.4"
                    y1="128"
                    x2="125.6"
                    y2="128"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M144.1,159.4l33-55.8a8.1,8.1,0,0,1,13.8,0L248,200H168"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                {activeStatsYtd.elevation_gain}m
              </p>
              <p className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="192"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <circle
                    cx="128"
                    cy="128"
                    r="96"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="16"
                  />
                  <polyline
                    points="128 72 128 128 184 128"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                {Math.floor(activeStatsYtd.moving_time / 3600)}h
              </p>
              <p className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="192"
                  height="192"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <path
                    d="M24,184V161.1C24,103.6,70.2,56.2,127.6,56A104,104,0,0,1,232,160v24a8,8,0,0,1-8,8H32A8,8,0,0,1,24,184Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="128"
                    y1="56"
                    x2="128"
                    y2="88"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="27.5"
                    y1="133.1"
                    x2="58.5"
                    y2="141.4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="228.5"
                    y1="133.1"
                    x2="197.5"
                    y2="141.4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="103.4"
                    y1="192"
                    x2="171.8"
                    y2="102.9"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>{' '}
                {activeStatsYtd.distance > 0
                  ? (
                      activeStatsAllTime.distance /
                      1000 /
                      (activeStatsAllTime.moving_time / 3600)
                    ).toFixed(2)
                  : 0}{' '}
                km/h
              </p>
            </div>
            <div className="px-2 w-full max-w-[70%] lg:max-w-[50%] flex flex-col items-center pb-4">
              {showRunning ? '1000' : '5000'}km goal
              <progress
                className="mt-2 w-full"
                value={
                  (showRunning
                    ? stravaStats.all_run_totals.distance
                    : stravaStats.all_ride_totals.distance) /
                  (showRunning ? 10000 : 50000)
                }
                max={100}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats

export function headers() {
  return {
    'Cache-Control': 'public, max-age=0, s-max-age=86400',
  }
}
