import { ReactNode, useState } from 'react';
import { formatAddress } from '../../../util';
import { IconContainer, WalletIcon } from '../../Icons';
import CaretIcon from '../../Icons/CaretIcon';
import WalletMenu from './WalletMenu';

export function Row({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center justify-center gap-4 text-center text-xs md:justify-end">
      {children}
    </span>
  );
}

interface IProps {
  accountAddress: string;
  chainString: string;
  handleDisconnect: () => void;
}

function WalletInfo({ accountAddress, handleDisconnect, chainString }: IProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="flex items-center"
        onMouseDown={(event) => {
          event.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <IconContainer>
          <WalletIcon />
        </IconContainer>

        <span className="flex w-full items-center justify-center truncate text-ellipsis pt-0.5 pr-2 text-xs md:justify-end">
          {formatAddress(accountAddress)}
        </span>
        <IconContainer>
          <CaretIcon isRotated={isMenuOpen} />
        </IconContainer>
      </button>

      {isMenuOpen && (
        <WalletMenu
          accountAddress={accountAddress}
          handleCloseMenu={() => setIsMenuOpen(false)}
          handleDisconnect={handleDisconnect}
          chainString={chainString}
        />
      )}
    </>
  );
}
export default WalletInfo;
