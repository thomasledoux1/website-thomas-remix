import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SocialLinkProps = {
  label: string;
  href: string;
  icon: IconProp;
  fill?: string;
};

const SocialLink = ({
  label,
  href,
  icon,
  fill = 'fill-current',
}: SocialLinkProps) => (
  <li>
    <a target="_blank" rel="noopener noreferrer" aria-label={label} href={href}>
      <FontAwesomeIcon size="2x" icon={icon} className={fill} />
    </a>
  </li>
);

export default SocialLink;
