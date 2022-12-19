import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../util';

interface INavLinkProps {
  to: string;
  isCurrentPage: boolean;
  children: ReactNode
}

function NavLink({ isCurrentPage, to, children }: INavLinkProps) {
  return (
    <Link
      className={classNames('px-3 text-sm text-neutral-400 hover:text-neutral-200', isCurrentPage
        ? 'text-neutral-200' : '')}
      to={to}
    >
      {children}
    </Link>
  );
}

export default NavLink;
