import { ReactNode, useState } from 'react';
import { formatAddress } from '../../../util';
import { IconContainer, WalletIcon } from '../../Icons';
import CaretIcon from '../../Icons/CaretIcon';
import WalletMenu from './WalletMenu';

export function Row({
  children,
}: { children: ReactNode }) {
  return (
    <span className="text-xs text-center flex justify-center md:justify-end items-center gap-4">
      {children}
    </span>
  );
}

interface IProps {
  accountAddress: string
  chainString: string
  handleDisconnect: () => void
}

function WalletInfo({ accountAddress, handleDisconnect, chainString }: IProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="flex items-center pr-6"
        onMouseDown={(event) => {
          event.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <IconContainer>
          <WalletIcon />
        </IconContainer>
        {/* // TODO view account on block explorer */}
        {/* // TODO split FAQ into new page */}
        {/* // TODO link BREAD text to token on polygonscan */}
        <span className="text-xs w-full flex items-center pt-0.5 pr-2 justify-center md:justify-end truncate text-ellipsis">
          {formatAddress(accountAddress)}
        </span>
        <IconContainer>
          <CaretIcon isRotated={isMenuOpen} />
        </IconContainer>
      </button>

      {
        isMenuOpen && (
          <WalletMenu
            handleCloseMenu={() => setIsMenuOpen(false)}
            handleDisconnect={handleDisconnect}
            chainString={chainString}
          />
        )
      }

    </>
  );
}
export default WalletInfo;
