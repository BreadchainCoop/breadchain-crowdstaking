import { useLocation } from 'react-router-dom';
import ExternalNavLink from '../ExternalNavLink';
import NavLink from '../NavLink';

function DesktopNavigation() {
  const location = useLocation();
  return (
    <nav className="hidden flex-grow items-center gap-2 pl-6 md:flex lg:gap-4 lg:pl-12">
      <NavLink isCurrentPage={location.pathname === '/'} to="/">
        Bake
      </NavLink>
      <NavLink isCurrentPage={location.pathname === '/about'} to="/about">
        About
      </NavLink>
      <NavLink isCurrentPage={location.pathname === '/faq'} to="/faq">
        FAQ
      </NavLink>
      <ExternalNavLink href="https://breadchain.mirror.xyz/">
        Blog
      </ExternalNavLink>
    </nav>
  );
}

export default DesktopNavigation;
