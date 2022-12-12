import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface INavLinkProps {
  to: string;
  isCurrentPage: boolean;
  children: ReactNode
}

function NavLink({ isCurrentPage, to, children }: INavLinkProps) {
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

export default NavLink;
