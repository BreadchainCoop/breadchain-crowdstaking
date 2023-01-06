import { useEffect, useRef } from 'react';
import LinkButton from '../../LinkButton';

interface IProps {
  chainString: string,
  handleCloseMenu: () => void
  handleDisconnect: () => void
}

function WalletMenu({ chainString, handleCloseMenu, handleDisconnect }: IProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!menuRef?.current?.contains(event.target as HTMLDivElement)) {
        handleCloseMenu();
      }
    };
    document.body.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.body.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <div ref={menuRef} className="absolute -bottom-10 right-0 transform translate-y-full whitespace-nowrap text-xs p-6 bg-breadgray-100">
      <div className="pb-4">
        Connected to
        {' '}
        {chainString}
      </div>
      <LinkButton handleClick={handleDisconnect}>disconnect</LinkButton>
    </div>
  );
}

export default WalletMenu;
