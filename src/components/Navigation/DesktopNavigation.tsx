import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface IDesktopNavLinkProps {

  to: string;
  isCurrentPage: boolean;
  children: ReactNode
}

function DesktopNavLink({ isCurrentPage, to, children }: IDesktopNavLinkProps) {
  return (
    <Link
      className={
        isCurrentPage
          ? 'px-5 text-sm text-neutral-200 hover:text-neutral-200'
          : 'px-5 text-sm text-neutral-400 hover:text-neutral-200'
      }
      to={to}
    >
      {children}
    </Link>
  );
}
interface IDesktopNavExternalLinkProps {
  href: string;
  children: ReactNode
}

function DesktopNavExternalLink(
  { href, children }: IDesktopNavExternalLinkProps,
) {
  return (
    <a
      href={href}
      rel="noopener noreferrer nofollow"
      target="_blank"
      className="px-5 text-sm text-neutral-400 hover:text-neutral-200"
    >
      {children}
    </a>
  );
}
function DesktopNavigation() {
  const location = useLocation();
  return (
    <nav className="flex-grow hidden md:flex items-center pl-16">
      <DesktopNavLink isCurrentPage={location.pathname === '/'} to="/">
        Bake
      </DesktopNavLink>
      <DesktopNavLink
        isCurrentPage={location.pathname === '/about'}
        to="/about"
      >
        About
      </DesktopNavLink>
      <DesktopNavExternalLink href="https://breadchain.mirror.xyz/">
        Blog
      </DesktopNavExternalLink>
    </nav>
  );
}

export default DesktopNavigation;
