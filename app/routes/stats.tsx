import { MetaFunction, useLoaderData, useTransition } from 'remix';
import React from 'react';
import {
  faBiking,
  faRunning,
  faRoad,
  faClock,
  faTachometerAlt,
  faMountain,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAccessToken, updateAccessToken } from '../utils/db';

type StatsData = {
  stravaStats: {
    all_run_totals: {
      elevation_gain: number;
      distance: number;
      moving_time: number;
    };
    all_ride_totals: {
      elevation_gain: number;
      distance: number;
      moving_time: number;
    };
    ytd_run_totals: {
      elevation_gain: number;
      distance: number;
      moving_time: number;
    };
    ytd_ride_totals: {
      elevation_gain: number;
      distance: number;
      moving_time: number;
    };
  };
};

export let meta: MetaFunction = () => {
  return {
    title: 'Thomas Ledoux | Stats',
    description: "Thomas Ledoux' Strava stats",
  };
};

export async function loader() {
  const { refresh_token, id, expiration_token, access_token } =
    await getAccessToken();
  let token = access_token;
  if (expiration_token <= Math.round(Date.now() / 1000)) {
    const resToken = await fetch(
      `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.CLIENT_ID_STRAVA}&client_secret=${process.env.CLIENT_SECRET_STRAVA}&grant_type=refresh_token&refresh_token=${refresh_token}`,
      {
        method: 'POST',
      }
    );
    const resTokenJson = await resToken.json();
    const {
      access_token: newToken,
      refresh_token: newRefreshToken,
      expires_at: newTokenExpiration,
    } = resTokenJson;
    token = newToken;

    updateAccessToken({
      id,
      access_token: newToken,
      refresh_token: newRefreshToken,
      expiration_token: newTokenExpiration,
    });
  }
  console.log(token);

  const resStats = await fetch(
    'https://www.strava.com/api/v3/athletes/40229513/stats',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const stravaStats = await resStats.json();
  console.log(stravaStats);
  return {
    stravaStats,
  };
}

const Stats = () => {
  let { stravaStats } = useLoaderData<StatsData>();
  const [showRunning, setShowRunning] = React.useState(false);
  const activeStatsYtd = showRunning
    ? stravaStats.ytd_run_totals
    : stravaStats.ytd_ride_totals;
  const activeStatsAllTime = showRunning
    ? stravaStats.all_run_totals
    : stravaStats.all_ride_totals;
  const btnClass =
    'px-6 lg:px-12 py-2 lg:py-4 border-2 border-purple flex justify-center cursor-pointer  w-1/2 text-center';
  const btnActiveClass = 'bg-primary text-white border-purple';
  return (
    <section id="stats" className="text-text">
      <div className="container mx-auto min-h-screen-without-nav flex flex-col items-center justify-center pt-12 w-full">
        <h2 className="text-center text-2xl mb-6 font-bold">My Strava stats</h2>
        <div className="flex flex-col gap-6 w-full lg:mx-auto relative lg:w-1/2 text-center md:text-left">
          <div className="flex rounded-full self-center">
            <button
              aria-label="Toggle bike mode"
              type="button"
              className={`${btnClass} rounded-tl-full rounded-bl-full ${
                !showRunning ? btnActiveClass : ''
              }`}
              onClick={() => setShowRunning(false)}
            >
              <FontAwesomeIcon size="2x" icon={faBiking} />
            </button>
            <button
              aria-label="Toggle run mode"
              type="button"
              className={`${btnClass} rounded-tr-full rounded-br-full ${
                showRunning ? btnActiveClass : ''
              }`}
              onClick={() => setShowRunning(true)}
            >
              <FontAwesomeIcon size="2x" icon={faRunning} />
            </button>
          </div>
          <div className="border-4 border-purple rounded-xl flex flex-col md:flex-row">
            <div className="px-8 py-4 flex flex-col md:w-1/2 order-2 md:order-1">
              <h3 className="font-bold text-xl mb-4">All time</h3>
              <p className="mb-3">
                <FontAwesomeIcon icon={faRoad} className="mr-2" />
                {Math.floor(activeStatsAllTime.distance / 1000)}
                km
              </p>
              <p className="mb-3">
                <FontAwesomeIcon icon={faMountain} className="mr-2" />
                {activeStatsAllTime.elevation_gain}m
              </p>
              <p className="mb-3">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                {Math.floor(activeStatsAllTime.moving_time / 3600)}h
              </p>
              <p className="mb-3">
                <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                {(
                  activeStatsAllTime.distance /
                  1000 /
                  (activeStatsAllTime.moving_time / 3600)
                ).toFixed(2)}{' '}
                km/h
              </p>
              <div className="flex flex-col items-center md:items-start">
                {showRunning ? 'Running' : 'Biking'} towards{' '}
                {showRunning ? '1000' : '5000'}km goal
                <progress
                  className="mt-2"
                  value={
                    (showRunning
                      ? stravaStats.all_run_totals.distance
                      : stravaStats.all_ride_totals.distance) /
                    (showRunning ? 10000 : 50000)
                  }
                  max={100}
                ></progress>
              </div>
            </div>
            <div className="px-8 py-4 flex flex-col md:w-1/2 md:order-2">
              <h3 className="font-bold text-xl mb-4">
                This year {showRunning ? 'run' : 'ride'}s
              </h3>
              <p className="mb-3">
                <FontAwesomeIcon icon={faRoad} className="mr-2" />
                {Math.floor(activeStatsYtd.distance / 1000)}
                km
              </p>
              <p className="mb-3">
                <FontAwesomeIcon icon={faMountain} className="mr-2" />
                {activeStatsYtd.elevation_gain}m
              </p>
              <p className="mb-3">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                {Math.floor(activeStatsYtd.moving_time / 3600)}h{' '}
                {Math.floor((activeStatsYtd.moving_time % 3600) / 60)}m
              </p>
              <p className="mb-3">
                <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                {activeStatsYtd.distance > 0 ? (
                  <>
                    {(
                      activeStatsYtd.distance /
                      1000 /
                      (activeStatsYtd.moving_time / 3600)
                    ).toFixed(2)}
                  </>
                ) : (
                  0
                )}{' '}
                km/h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;

export function headers() {
  return {
    'Cache-Control': 'max-age=0, s-max-age=86400, stale-while-revalidate=86400',
  };
}
