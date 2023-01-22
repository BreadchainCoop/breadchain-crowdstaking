import { ReactNode } from 'react';

interface IExternalNavLinkProps {
  href: string;
  children: ReactNode
  handleClick?: () => void
}

function ExternalNavLink(
  { href, children, handleClick }: IExternalNavLinkProps,
) {
  return (
    <a
      href={href}
      rel="noopener noreferrer nofollow"
      target="_blank"
      className="px-3 text-sm text-neutral-400 hover:text-neutral-200"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

ExternalNavLink.defaultProps = {
  handleClick: () => { },
};

export default ExternalNavLink;
