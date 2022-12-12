import { useLocation } from 'react-router-dom';
import ExternalNavLink from './ExternalNavLink';
import NavLink from './NavLink';

function DesktopNavigation() {
  const location = useLocation();
  return (
    <nav className="flex-grow hidden md:flex items-center pl-8">
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
