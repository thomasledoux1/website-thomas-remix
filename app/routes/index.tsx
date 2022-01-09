import { Link, MetaFunction } from 'remix';
import { OptimizedImage } from '~/components/OptimizedImage';

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
        className="relative pt-4 min-h-screen-without-nav items-center content-center flex text-text"
      >
        <div className="container gap-8 md:gap-0 grid md:grid-cols-2 items-center content-center justify-items-center">
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
              width={640}
              height={640}
            />
          </div>
        </div>
      </section>
    </>
  );
}
