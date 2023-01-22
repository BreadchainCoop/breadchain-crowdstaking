import { useEffect, useRef } from 'react';
import LinkButton from '../../LinkButton';

interface IProps {
  chainString: string,
  accountAddress: string
  handleCloseMenu: () => void
  handleDisconnect: () => void
}

function WalletMenu({
  chainString, accountAddress, handleCloseMenu, handleDisconnect,
}: IProps) {
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
    <div ref={menuRef} className="absolute -bottom-10 right-0 transform translate-y-full whitespace-nowrap text-xs p-6 bg-breadgray-100 flex flex-col gap-4 items-end">
      <div>
        Connected to
        {' '}
        {chainString}
      </div>
      <div>
        <a className="underline text-neutral-400 hover:text-neutral-300" target="_blank" href={`https://polygonscan.com/address/${accountAddress}`} rel="noreferrer">View account on polygonscan</a>
      </div>
      <LinkButton handleClick={handleDisconnect}>disconnect</LinkButton>
    </div>
  );
}

export default WalletMenu;
