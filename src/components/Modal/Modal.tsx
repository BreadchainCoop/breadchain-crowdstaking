import { TModalStatus, TModalType, useModal } from '../../context/ModalContext';
import { useTransactionDisplay } from '../../context/TransactionDisplayContext';

import Elipsis from '../Elipsis/Elipsis';
import AddTokens from './AddTokens';
import { CloseModalButton, Container, Heading, Inner, Message } from './ui';

type TProps = {
  type: TModalType;
  title: string;
  status: TModalStatus;
};

function Modal({ type, title, status }: TProps) {
  const { dispatch: modalDispatch } = useModal();
  const { state: txState } = useTransactionDisplay();

  const txStatus = txState?.status;
  const handleCloseModal = () => {
    modalDispatch({ type: 'CLEAR_MODAL' });
  };
  switch (type) {
    case 'DISCLAIMER':
      return (
        <Container>
          <Inner>
            <CloseModalButton handleClick={handleCloseModal} />
            <article className="prose prose-invert font-redhat text-[18px] prose-h2:mb-8 prose-h2:font-pressstart">
              <h2>{title}</h2>
              <p>
                The Breadchain Crowdstaking Application is essentially a smart
                contract on the Polygon network that forwards Crowdstakers’ DAI
                (a fully collateralized US Dollar pegged stablecoin) into a
                lending pool in which all of the interest earned on the DAI goes
                to Breadchain to help fund more projects part of the [Breadchain
                Network](https://breadcha.in/projects).
              </p>
              <p>
                In return for giving DAI, Crowdstakers mint and receive a token
                called BREAD as collateral in the same quantity they gave in
                DAI. The BREAD token acts as both a form of collateral from the
                cooperative and a digital local currency for the Breadchain
                Network of projects and broader ecosystem. Digital as in crypto
                and local not as in geographic locality, but local in shared
                values around cooperativism. And like a local currency, it is
                intended to keep value within the defined locality. It is at the
                same time an engine for fundraising for post-capitalist
                blockchain projects as well as a digital local currency
                mechanism. It is the first solidarity primitive created by the
                Breadchain Cooperative.
              </p>
              <p>
                You can learn more about the high level architecture that makes
                the Breadchain Crowdstaking Protocol work
                [here](https://breadcha.in/blog/3). Join the Crypto Leftists
                discord group [here](https://discord.gg/ezt7JDjUSW) to stay up
                to date with the project and share any thoughts or questions you
                may have.
              </p>
            </article>
          </Inner>
        </Container>
      );
    case 'BAKING':
      return (
        <Container>
          <Inner>
            {status === 'UNLOCKED' && (
              <button
                type="button"
                className="absolute right-0 top-0 p-4 text-xs text-neutral-500"
                onClick={handleCloseModal}
              >
                X
              </button>
            )}
            <Heading>{title}</Heading>
            {status === 'LOCKED' && (
              <Message>
                Awaiting user response
                <Elipsis />
              </Message>
            )}

            {status === 'UNLOCKED' && (
              <>
                {txStatus === 'PENDING' && (
                  <Message>
                    Transaction in progress <Elipsis />
                  </Message>
                )}
                {txStatus === 'COMPLETE' && (
                  <Message>Transaction complete!</Message>
                )}
                <AddTokens />
              </>
            )}
          </Inner>
        </Container>
      );
    case 'BURNING':
      return (
        <Container>
          <Inner>
            {status === 'UNLOCKED' && (
              <button
                type="button"
                className="absolute right-0 top-0 p-4 text-xs text-neutral-500"
                onClick={handleCloseModal}
              >
                X
              </button>
            )}
            <Heading>{title}</Heading>
            {status === 'LOCKED' && (
              <Message>
                Awaiting user response
                <Elipsis />
              </Message>
            )}

            {status === 'UNLOCKED' && (
              <>
                {txStatus === 'PENDING' && (
                  <Message>
                    Transaction in progress <Elipsis />
                  </Message>
                )}
                {txStatus === 'COMPLETE' && (
                  <Message>Transaction complete!</Message>
                )}
                <AddTokens />
              </>
            )}
          </Inner>
        </Container>
      );
    case 'CONNECT_WALLET':
      return (
        <Container>
          <Inner>
            <Heading>Connecting Wallet</Heading>
            <Message>
              Awaiting user response
              <Elipsis />
            </Message>
          </Inner>
        </Container>
      );
    case 'APPROVAL':
      return (
        <Container>
          <Inner>
            <Heading>Approving Contract</Heading>
            <Message>
              Awaiting user response
              <Elipsis />
            </Message>
          </Inner>
        </Container>
      );
    case 'CHANGE_NETWORK':
      return (
        <Container>
          <Inner>
            <Heading>Changing Network</Heading>
            <Message>
              Awaiting user response
              <Elipsis />
            </Message>
          </Inner>
        </Container>
      );
    case 'CHANGING_NETWORK':
      return (
        <Container>
          <Inner>
            <Heading>Changing Network</Heading>
            <Message>please wait a moment!</Message>
          </Inner>
        </Container>
      );
    default:
      throw new Error('modal type invalid');
  }
}

export default Modal;
