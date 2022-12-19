import { ReactNode } from 'react';

interface IExternalNavLinkProps {
  href: string;
  children: ReactNode
}

function ExternalNavLink(
  { href, children }: IExternalNavLinkProps,
) {
  return (
    <a
      href={href}
      rel="noopener noreferrer nofollow"
      target="_blank"
      className="px-3 text-sm text-neutral-400 hover:text-neutral-200"
    >
      {children}
    </a>
  );
}

export default ExternalNavLink;
