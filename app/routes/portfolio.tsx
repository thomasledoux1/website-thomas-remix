import {MetaFunction} from 'remix'
import Case from '../components/Case'

export const meta: MetaFunction = () => ({
  title: 'Thomas Ledoux | Portfolio',
  description: 'Projects Thomas Ledoux worked on',
  'twitter:title': 'Thomas Ledoux | Portfolio',
  'twitter:description': 'Projects Thomas Ledoux worked on',
  'og:title': 'Thomas Ledoux | Portfolio',
  'og:description': 'Projects Thomas Ledoux worked on',
})

const Portfolio = () => (
  <section
    id="portfolio"
    className="container mx-auto px-4 lg:px-16 text-text my-12"
  >
    <div className="items-center content-center">
      <h2 className="text-center text-2xl mb-6 md:mb-12 font-bold">
        Some of my work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <Case
          url="https://www.karaton.be"
          logoAlt="Karaton"
          img="/logokaraton.png"
          logoWidth={218}
          tags={['mongodb', 'expressjs', 'angular', 'nodejs']}
        >
          <p className="mb-4">
            For Happs Development I created and maintained the <b>Angular</b>{' '}
            website for Karaton where speech therapists and parents of dyslexic
            could follow up on the progress their children/patients are making
            in the Karaton game.
          </p>
          <p className="mb-4">
            There were a lot of graphs to be shown with Highcharts, a payment
            integration through Mollie, different roles for
            admins/therapists/parents.
          </p>
          <p>
            In this team I worked as a Full Stack Developer, giving me a lot of
            insight in how the backend of a web application works.
          </p>
        </Case>
        <Case
          url="https://www.getrialto.com"
          logoAlt="Rialto"
          img="/logorialto.webp"
          logoWidth={321}
          tags={['swift', 'ios']}
        >
          <p className="mb-4">
            At my internship for Rialto I created an iOS app from scratch in{' '}
            <b>Swift</b> where real estate companies could easily manage their
            listings.
          </p>
          <p className="mb-4">
            I created the screens in storyboards based on the designs provided
            by our designer.
          </p>
          <p>
            When the screens were finished I used Swift code to implement
            functionality such as logins through an API, fetching the listings
            through an API, saving the listings in the SQLite database..
          </p>
        </Case>
        <Case
          url="https://play.google.com/store/apps/details?id=com.carlierkathleen.rekenen&hl=nl"
          logoAlt="Carlier Rekenen"
          img="/logocarlier.webp"
          logoWidth={100}
          tags={['react-native', 'react']}
        >
          <p className="mb-4">
            While working at Happs Development I also created a mobile
            application for a speech therapist to help children with discalculia
            to learn how to count and do simple math exercises in a fun game
            form.
          </p>
          <p className="mb-4">
            The app was created from scratch using <b>React Native</b> for fast
            development, and Expo to get fast previews of the app on real
            devices.
          </p>
          <p>
            This project taught me a lot about <b>animations</b>, how to handle
            dynamically generated sound output for the spoken numbers, learn
            which platform specific APIs to use..
          </p>
        </Case>
        <Case
          url="https://www.carglass.be"
          logoAlt="Carglass"
          img="/logocarglass.png"
          logoWidth={374}
          tags={['sitecore', 'react', 'less']}
        >
          <p className="mb-4">
            At my current job at The Reference I help maintain the website for
            Carglass, we keep adding new features and maintain the older code in
            sprints.
          </p>
          <p className="mb-4">
            We have a separate Backend Development team, so my focus is purely
            on the Frontend Development in <b>React</b>.
          </p>
          <p>
            In the booking flows we make heavy use of MobX for state management,
            Local- and Sessionstorage to save intermediary input by the users
            and integrate with APIs from different parties.
          </p>
        </Case>
        <Case
          url="https://www.nationale-loterij.be"
          logoAlt="Nationale Loterij"
          img="/logonalo.webp"
          logoWidth={240}
          tags={['sitecore', 'react', 'sass']}
        >
          <p className="mb-4">
            One of the other clients I work for at The Reference is Nationale
            Loterij, for this client we constantly create new features with a
            modern look on a monthly basis.
          </p>
          <p className="mb-4">
            In this project I get to test out even more new technologies, and
            new features in the existing technologies (think <b>React Hooks</b>,
            CSS3 animations..).
          </p>
          <p>
            The feature I&apos;m most proud of is the interactive Sponsoring Map
            of Belgium we created with some nice animations and beautiful
            design.
          </p>
        </Case>
        <Case
          url="https://www.achterderegenboog.be"
          logoAlt="Achter De Regenboog"
          img="/logoachterderegenboog.webp"
          logoWidth={150}
          tags={['wordpress', 'html', 'css']}
        >
          <p className="mb-4">
            In my free time I like to experiment with other frameworks and
            technologies too, this is why I made a website using{' '}
            <b>Wordpress</b> for a friend of mine who started a psychologists
            practice.
          </p>
          <p className="mb-4">
            My friend gave me some high level designs, and I got to work! I
            selected a fitting theme.
          </p>
          <p>
            I built on the theme with a lot of plugins to optimize the speed of
            the website (Autoptimize), the SEO (Yoast) and anti-spam by Akismet.
          </p>
        </Case>
        <Case
          url="https://www.deckdeckgo.com"
          logoAlt="DeckDeckGo"
          img="/logodeckdeckgo.webp"
          logoWidth={100}
          tags={['open source', 'hacktoberfest', 'stencil', 'typescript']}
        >
          <p className="mb-4">
            In 2020 I participated in <b>Hacktoberfest</b> for the first time
            ever. I did some research on which open source project I would like
            to contribute to, and landed on DeckDeckGo.
          </p>
          <p>
            It was a lot of fun to coloborate with other <b>open source</b>{' '}
            contributors, and to work in a new technological stack. I&apos;m
            definitely going to continue contributing to open source in the
            future!
          </p>
        </Case>
        <Case
          url="https://www.accentjobs.be"
          logoAlt="Accent Jobs"
          img="/logoaccent.webp"
          logoWidth={532}
          tags={['gatsby', 'drupal', 'typescript', 'emotion']}
        >
          <p className="mb-4">
            At the end of 2020, I got the opportunity to work on a project
            within The Reference using our new MACH stack.
          </p>
          <p className="mb-4">
            This was the first time I was using <b>Gatsby</b> for a production
            website, and I must say it makes developing a breeze. Connecting
            everything through API&apos;s, no hard dependecies on a CMS.. I love
            it.
          </p>
        </Case>
        <Case
          url="https://www.portofantwerp.be"
          logoAlt="Port Of Antwerp"
          img="/logopoa.webp"
          logoWidth={199}
          tags={['nextjs', 'drupal', 'typescript', 'tailwind', 'algolia']}
        >
          <p className="mb-4">
            Starting february 2021, we started working on a new website for the
            Port of Antwerp. This website uses the MACH stack as mentioned
            above, but with <b>Next.js</b> instead of Gatsby, and{' '}
            <b>Tailwind</b> for styling!
          </p>
          <p>
            I really like this combo (this website is made with these
            technologies), so I couldn&apos;t be happier to be the lead frontend
            developer on this project. So far I&apos;ve learned a lot about the
            many features and possibilities of Next.js, and I&apos;m hoping to
            create the most performant website for this high profile client.
          </p>
        </Case>
        <Case
          url="https://www.sdworx.com"
          logoAlt="SD Worx"
          img="/logosd.webp"
          logoWidth={377}
          tags={[
            'nextjs',
            'drupal',
            'typescript',
            'bootstrap',
            'algolia',
            'kubernetes',
          ]}
        >
          <p className="mb-4">
            For SD Worx we went with almost the same stack as the project for
            Port of Antwerp, only this time we were forced to use Bootstrap
            instead of Tailwind. On this project I&apos;m also lead frontend
            developer, and I do some devops work here too.
          </p>
          <p>
            The devops work is mostly setting up the Azure build pipelines,
            managing the <b>Kubernetes</b> cluster...
          </p>
        </Case>
        <Case
          url="https://www.sibelco.com"
          logoAlt="Sibelco"
          img="/logosibelco.webp"
          logoWidth={305}
          tags={['nextjs', 'kontent.ai', 'typescript', 'tailwind', 'algolia']}
        >
          <p className="mb-4">
            Sibelco was the first client for who we worked with{' '}
            <b>Kontent.ai</b>, which was a really great experience to work with.
            We also started using <b>Storybook</b> for the first time at The
            Reference in this project, which helped us a lot to prototype fast,
            and create consistency.
          </p>
          <p>
            In this project I coached 4 people, while also actively developing
            new features. The greatest part was setting up the <b>Algolia</b>{' '}
            integrations to index the materials and products, which was a breeze
            with Algolia.
          </p>
        </Case>
      </div>
    </div>
  </section>
)

export default Portfolio
