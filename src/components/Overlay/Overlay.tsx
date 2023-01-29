import { ReactNode } from 'react';
import { classNames } from '../../util';

function Overlay({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={classNames(
        'z-9 fixed top-0 bottom-0 left-0 right-0 h-screen w-screen bg-neutral-900 opacity-0 transition-opacity md:hidden',
        isOpen ? 'block opacity-70' : 'hidden',
      )}
    >
      {children !== null && children}
    </div>
  );
}

Overlay.defaultProps = {
  children: null,
};
export default Overlay;
