import { MouseEvent, ReactNode } from 'react';
import { classNames } from '../../util';

function Overlay({
  isOpen,
  children,
  closeMenu,
}: {
  isOpen: boolean;
  children?: ReactNode;
  closeMenu: () => void;
}) {
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    closeMenu();
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={classNames(
        'z-9 fixed top-0 bottom-0 left-0 right-0 h-screen w-screen bg-neutral-900 opacity-0 transition-opacity md:hidden',
        isOpen ? 'block opacity-70' : 'hidden',
      )}
      onClick={handleClick}
    >
      {children !== null && children}
    </div>
  );
}

Overlay.defaultProps = {
  children: null,
};
export default Overlay;
