import React from "react";
import { Link, useLocation } from "react-router-dom";

interface IDesktopNavLinkProps {
  to: string;
  isCurrentPage: boolean;
}

const DesktopNavLink: React.FC<IDesktopNavLinkProps> = (props) => {
  return (
    <Link
      className={
        props.isCurrentPage
          ? "px-5 text-sm text-neutral-200 hover:text-neutral-200"
          : "px-5 text-sm text-neutral-400 hover:text-neutral-200"
      }
      to={props.to}
    >
      {props.children}
    </Link>
  );
};

interface IDesktopNavExternalLinkProps {
  href: string;
}

const DesktopNavExternalLink: React.FC<IDesktopNavExternalLinkProps> = (
  props
) => {
  return (
    <a
      href={props.href}
      rel="noopener noreferrer nofollow"
      target="_blank"
      className="px-5 text-sm text-neutral-400 hover:text-neutral-200"
    >
      {props.children}
    </a>
  );
};

const DesktopNavigation: React.FC = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav className="flex-grow hidden md:flex items-center pl-16">
      <DesktopNavLink isCurrentPage={location.pathname === "/"} to="/">
        Bake
      </DesktopNavLink>
      <DesktopNavLink
        isCurrentPage={location.pathname === "/about"}
        to="/about"
      >
        About
      </DesktopNavLink>
      <DesktopNavExternalLink href="https://breadchain.mirror.xyz/">
        Blog
      </DesktopNavExternalLink>
    </nav>
  );
};

export default DesktopNavigation;
