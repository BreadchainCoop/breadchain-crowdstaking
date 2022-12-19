import LinkButton from '../../LinkButton';

interface IProps {
  chainString: string
  handleDisconnect: () => void
}

function WalletMenu({ chainString, handleDisconnect }: IProps) {
  return (
    <div className="absolute -bottom-10 right-0 transform translate-y-full whitespace-nowrap text-xs p-6 bg-breadgray-100">
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
