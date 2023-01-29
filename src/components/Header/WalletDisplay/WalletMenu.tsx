import { useEffect, useRef } from 'react';
import Button from '../../Button';
import { IconContainer, NetworkIcon } from '../../Icons';

interface IProps {
  chainString: string;
  accountAddress: string;
  handleCloseMenu: () => void;
  handleDisconnect: () => void;
}

function WalletMenu({
  chainString,
  accountAddress,
  handleCloseMenu,
  handleDisconnect,
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
    <div
      ref={menuRef}
      className="absolute -bottom-10 right-0 flex translate-y-full transform flex-col items-end gap-4 whitespace-nowrap bg-breadgray-100 p-6 text-xs"
    >
      <div className="flex items-center gap-4 text-neutral-300">
        <IconContainer>
          <NetworkIcon />
        </IconContainer>

        {chainString}
      </div>
      <div className="pb-3">
        <a
          className="text-neutral-400 underline hover:text-neutral-300"
          target="_blank"
          href={`https://polygonscan.com/address/${accountAddress}`}
          rel="noreferrer"
        >
          View Account
        </a>
      </div>
      <Button variant="small" onClick={handleDisconnect}>
        Disconnect
      </Button>
    </div>
  );
}

export default WalletMenu;
