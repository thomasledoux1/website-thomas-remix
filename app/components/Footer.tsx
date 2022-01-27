import SocialLink from './SocialLink'

const Footer = () => (
  <footer className="bg-secondary relative">
    <div className="p-5 flex justify-center items-center">
      <ul className="flex gap-6">
        <SocialLink
          label="linkedin"
          href="https://www.linkedin.com/in/thomasledoux91"
        />
        <SocialLink label="github" href="https://github.com/thomasledoux1" />
        <SocialLink label="dev" href="https://dev.to/thomasledoux1" />
      </ul>
    </div>
  </footer>
)

export default Footer
