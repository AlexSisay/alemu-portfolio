import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const LINKS = [
  {
    href: 'https://github.com/alexsisay',
    label: 'GitHub profile of Alemu Sisay Nigru',
    Icon: Github,
    external: true
  },
  {
    href: 'https://www.linkedin.com/in/alemu-sisay-nigru-23612514b',
    label: 'LinkedIn profile of Alemu Sisay Nigru',
    Icon: Linkedin,
    external: true
  },
  {
    href: 'mailto:alemu.nigru@unibs.it',
    label: 'Email Alemu Sisay Nigru at alemu.nigru@unibs.it',
    Icon: Mail,
    external: false
  }
];

const SocialLinks = ({ className = 'flex space-x-4', iconClassName = 'w-6 h-6' }) => (
  <div className={className}>
    {LINKS.map(({ href, label, Icon, external }) => (
      <a
        key={href}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={label}
        className="text-secondary-600 hover:text-primary-600 transition-colors"
      >
        <Icon className={iconClassName} aria-hidden="true" />
      </a>
    ))}
  </div>
);

export default SocialLinks;
