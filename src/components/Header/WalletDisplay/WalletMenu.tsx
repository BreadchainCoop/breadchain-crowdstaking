import { useEffect, useRef } from 'react';
import Button from '../../Button';
import { IconContainer, NetworkIcon } from '../../Icons';

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
      <div className="flex gap-4 items-center">
        <IconContainer>
          <NetworkIcon />
        </IconContainer>

        {chainString}
      </div>
      <div className="pb-3">
        <a className="underline text-neutral-400 hover:text-neutral-300" target="_blank" href={`https://polygonscan.com/address/${accountAddress}`} rel="noreferrer">View Account</a>
      </div>
      <Button variant="small" onClick={handleDisconnect}>Disconnect</Button>
    </div>
  );
}

export default WalletMenu;
