import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SocialLinkProps = {
  label: string;
  href: string;
  icon: IconProp;
};

const SocialLink = ({ label, href, icon }: SocialLinkProps) => (
  <li>
    <a target="_blank" rel="noopener noreferrer" aria-label={label} href={href}>
      <FontAwesomeIcon
        size="2x"
        icon={icon}
        className="fill-current dark:text-purple"
      />
    </a>
  </li>
);

export default SocialLink;
