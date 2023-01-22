import { formatAddress } from '../../util';
import { IconContainer, NetworkIcon } from '../Icons';
import LinkButton from '../LinkButton';

interface IProps {
  accountAddress: string | undefined,
  chainString: string,
  handleDisconnect: () => void
}

function MobileWalletDisplay({
  accountAddress,
  chainString,
  handleDisconnect,
}: IProps) {
  return (
    <section className="flex flex-col gap-2 px-5 text-xs">
      <div className="flex gap-4 justify-end items-center">
        <IconContainer>
          <NetworkIcon />
        </IconContainer>
        {chainString}

      </div>
      {accountAddress && (
        <div className="flex flex-col gap-4">
          <span className="text-xs w-full flex items-right pt-0.5 justify-end md:justify-end truncate text-ellipsis">
            {formatAddress(accountAddress)}
          </span>
          <div className="flex justify-end">
            <LinkButton handleClick={handleDisconnect}>disconnect</LinkButton>
          </div>
          <div className="flex justify-end">
            <a className="underline text-neutral-400 hover:text-neutral-300" target="_blank" href={`https://polygonscan.com/address/${accountAddress}`} rel="noreferrer">View account on polygonscan</a>
          </div>
        </div>
      )}
    </section>
  );
}
export default MobileWalletDisplay;
