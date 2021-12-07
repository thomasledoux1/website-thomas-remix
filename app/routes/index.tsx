import { Link, MetaFunction } from 'remix';

export let meta: MetaFunction = () => {
  return {
    title: 'Thomas Ledoux | Home',
    description: "Thomas Ledoux' personal website",
  };
};

export default function Index() {
  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen-without-nav items-center content-center flex pb-16 dark:bg-lightgrey text-text"
      >
        <div className="container gap-8 md:gap-0 mx-6 sm:mx-auto grid md:grid-cols-2 items-center content-center justify-items-center">
          <h1 className="text-4xl font-bold md:text-6xl flex flex-col items-center md:items-start">
            <span>Thomas is a</span>
            <Link className="animate-title-part1" to="/portfolio">
              developer
            </Link>
            <Link className="animate-title-part2" to="/stats">
              cyclist
            </Link>
            <Link className="animate-title-part3" to="/personal">
              travel lover
            </Link>
          </h1>
          <div className="w-3/4">
            <img
              className="rounded-full"
              alt="Profile picture"
              src="/me.jpeg"
              placeholder="blur"
            />
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 sm:-bottom-20 text-purple dark:text-darkgrey fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path d="M0,32L20,58.7C40,85,80,139,120,170.7C160,203,200,213,240,213.3C280,213,320,203,360,197.3C400,192,440,192,480,186.7C520,181,560,171,600,144C640,117,680,75,720,74.7C760,75,800,117,840,149.3C880,181,920,203,960,181.3C1000,160,1040,96,1080,96C1120,96,1160,160,1200,165.3C1240,171,1280,117,1320,122.7C1360,128,1400,192,1420,224L1440,256L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"></path>
        </svg>
      </section>
    </>
  );
}

export function headers() {
  return {
    'Cache-Control': 'max-age=0, s-max-age=86400, stale-while-revalidate=86400',
  };
}
