import clsx from 'clsx';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface INavLinkProps {
  to: string;
  isCurrentPage: boolean;
  children: ReactNode;
  handleClick?: () => void;
}

function NavLink({ isCurrentPage, to, children, handleClick }: INavLinkProps) {
  return (
    <Link
      className={clsx(
        'px-3 text-sm text-neutral-400 hover:text-neutral-200',
        isCurrentPage ? 'text-neutral-200' : '',
      )}
      to={to}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

NavLink.defaultProps = {
  handleClick: () => {},
};

export default NavLink;
