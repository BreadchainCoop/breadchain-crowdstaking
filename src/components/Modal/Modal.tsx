import { TModalStatus, TModalType, useModal } from '../../context/ModalContext';
import { useTransactionDisplay } from '../../context/TransactionDisplayContext';

import Elipsis from '../Elipsis/Elipsis';
import Prose from '../Prose/Prose';
import AddTokens from './AddTokens';
import { CloseModalButton, Container, Heading, Inner, Message } from './ui';

import { html as disclaimerHtml } from '../../markdown/disclaimer.md';

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
            <Prose html="<h2>Disclaimer</h2>" />

            <Prose html={disclaimerHtml} />
          </Inner>
        </Container>
      );
    case 'BAKING':
      return (
        <Container>
          <Inner>
            {status === 'UNLOCKED' && (
              <CloseModalButton handleClick={handleCloseModal} />
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
              <CloseModalButton handleClick={handleCloseModal} />
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
