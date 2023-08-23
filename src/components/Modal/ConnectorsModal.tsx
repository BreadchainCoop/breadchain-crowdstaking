import ConnectWalletButton from '../Connectors';
import { CloseModalButton, Container, Inner } from './ui';

export default function ConnectorsModal({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  return (
    <Container>
      <Inner>
        <CloseModalButton handleClick={handleCloseModal} />
        <div className="flex flex-col gap-8 md:gap-12">
          <h1 className="text-lg">Connect Wallet</h1>
          <ConnectWalletButton />
        </div>
      </Inner>
    </Container>
  );
}
