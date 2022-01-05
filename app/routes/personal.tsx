import { Link, MetaFunction } from 'remix';
import { OptimizedImage } from '~/components/OptimizedImage';

export let meta: MetaFunction = () => {
  return {
    title: 'Thomas Ledoux | Personal',
    description: 'Personal information about Thomas Ledoux',
  };
};

const Personal = () => {
  const age = Math.floor(
    (new Date().getTime() - new Date('1991-07-11').getTime()) / 3.15576e10
  );
  return (
    <section id="personal">
      <div className="container mx-auto grid md:grid-cols-2 md:gap-8 min-h-screen-without-nav items-center content-center">
        <OptimizedImage
          className="mt-6"
          alt="Illustration of me working on laptop"
          src="/personal.svg"
        />
        <div className="bg-purple rounded-lg p-6 mt-12 md:mt-0">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>
            <p className="mb-4">
              Hi, I&apos;m Thomas. I&apos;m {age} years old, living in Ghent.
              <br></br>
              I&apos;m a professional Frontend Developer, currently working at
              The Reference.
            </p>
            <p className="mb-4">
              In general I really love to travel. My favourite kind of holiday
              is a roadtrip with a campervan, doing lots of hikes in nature and
              going for a swim in the sea at the end of the day!<br></br>
              When I&apos;m not traveling I like to sport a lot. I play
              badminton, cycle a lot, and I go for the occasional run.
            </p>
            <p className="mb-4">
              I studied Applied Computer Sciences at Hogeschool Gent. I chose
              the Mobile Development track, and went on Erasmus to Barcelona to
              learn more about Swift and Java. <br></br>After graduating I
              worked for the startup Happs as a full-stack developer, where I
              created and maintained the website. <br></br>I also created an app
              for a client in React Native during this period.
            </p>
            <p>
              You can read more about my work in the{' '}
              <Link
                className="shadow-link hover:text-white hover:shadow-link-hover dark:shadow-link-dark dark:hover:shadow-link-dark-hover transition-shadow"
                to="/portfolio"
              >
                portfolio
              </Link>{' '}
              section .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personal;
