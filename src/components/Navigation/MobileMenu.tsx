import { useLocation } from 'react-router-dom';
import { classNames } from '../../util';
import ExternalNavLink from './ExternalNavLink';
import NavLink from './NavLink';

function Overlay({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={classNames('fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-9 bg-neutral-900 opacity-0 transition-opacity', isOpen ? 'block opacity-70' : 'hidden')} />
  );
}

interface IProps { isOpen: boolean }

export function MobileNavigation({ isOpen }: IProps) {
  const location = useLocation();
  return (
    <>
      <Overlay isOpen={isOpen} />
      <section className={classNames('fixed right-0 top-0 h-screen w-10/12 z-10 bg-neutral-900 p-4 pt-16 transform translate-x-full transition-transform', isOpen ? 'translate-x-0' : '')}>
        <nav className="flex flex-col gap-4">
          <NavLink isCurrentPage={location.pathname === '/'} to="/">Bake</NavLink>
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
      </section>
    </>
  );
}
export default MobileNavigation;
