import { formatAddress } from '../../util';
import { IconContainer, NetworkIcon } from '../Icons';
import LinkButton from '../LinkButton';

interface IProps {
  accountAddress: string | undefined;
  chainString: string;
  handleDisconnect: () => void;
}

function MobileWalletDisplay({
  accountAddress,
  chainString,
  handleDisconnect,
}: IProps) {
  return (
    <section className="flex flex-col gap-2 px-5 text-xs">
      <div className="flex items-center justify-end gap-4">
        <IconContainer>
          <NetworkIcon />
        </IconContainer>
        {chainString}
      </div>
      {accountAddress && (
        <div className="flex flex-col gap-4">
          <span className="items-right flex w-full justify-end truncate text-ellipsis pt-0.5 text-xs md:justify-end">
            {formatAddress(accountAddress)}
          </span>
          <div className="flex justify-end">
            <LinkButton handleClick={handleDisconnect}>disconnect</LinkButton>
          </div>
          <div className="flex justify-end">
            <a
              className="text-neutral-400 underline hover:text-neutral-300"
              target="_blank"
              href={`https://polygonscan.com/address/${accountAddress}`}
              rel="noreferrer"
            >
              View account on polygonscan
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
export default MobileWalletDisplay;
