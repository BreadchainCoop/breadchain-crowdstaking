import { useLocation } from 'react-router-dom';
import ExternalNavLink from '../ExternalNavLink';
import NavLink from '../NavLink';

function DesktopNavigation() {
  const location = useLocation();
  return (
    <nav className="flex-grow hidden md:flex gap-2 lg:gap-4 items-center pl-6 lg:pl-12">
      <NavLink isCurrentPage={location.pathname === '/'} to="/">
        Bake
      </NavLink>
      <NavLink
        isCurrentPage={location.pathname === '/about'}
        to="/about"
      >
        About
      </NavLink>
      <ExternalNavLink href="https://breadchain.mirror.xyz/">
        Blog
      </ExternalNavLink>
      <ExternalNavLink href="https://guild.xyz/breadchain">Guild</ExternalNavLink>
    </nav>
  );
}

export default DesktopNavigation;
