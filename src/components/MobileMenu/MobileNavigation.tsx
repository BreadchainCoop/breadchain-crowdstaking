import { useLocation } from 'react-router-dom';

import ExternalNavLink from '../ExternalNavLink';
import NavLink from '../NavLink';

interface IProps {
  handleNavToggle: () => void;
}

function MobileNavigation({ handleNavToggle }: IProps) {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-4 text-right">
      <NavLink
        isCurrentPage={location.pathname === '/'}
        to="/"
        handleClick={() => handleNavToggle()}
      >
        Bake
      </NavLink>
      <NavLink
        isCurrentPage={location.pathname === '/about'}
        to="/about"
        handleClick={() => handleNavToggle()}
      >
        About
      </NavLink>
      <ExternalNavLink href="https://breadchain.mirror.xyz/">
        Blog
      </ExternalNavLink>
      <ExternalNavLink href="https://guild.xyz/breadchain">
        Guild
      </ExternalNavLink>
    </nav>
  );
}

export default MobileNavigation;
