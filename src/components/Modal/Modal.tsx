import { TModalStatus, TModalType, useModal } from '../../context/ModalContext';

import Elipsis from '../Elipsis/Elipsis';
import AddTokens from './AddTokens';
import {
  Container, Inner, Heading, Message,
} from './ui';

type TProps = {
  type: TModalType,
  title: string,
  status: TModalStatus
};

function Modal({ type, title, status }: TProps) {
  const { dispatch: modalDispatch } = useModal();

  const handleCloseModal = () => {
    modalDispatch({ type: 'CLEAR_MODAL' });
  };
  switch (type) {
    case 'MINTING':
      return (
        <Container>
          <Inner>
            {status === 'UNLOCKED' && (
              <button
                type="button"
                className="absolute right-0 top-0 p-4 text-neutral-500 text-xs"
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
                <Message>Transaction in progress!</Message>
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
                className="absolute right-0 top-0 p-4 text-neutral-500 text-xs"
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
                <Message>Transaction in progress!</Message>
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
            <Heading>Changing Network...</Heading>
            <Message>please wait a moment!</Message>
          </Inner>
        </Container>
      );
    default:
      throw new Error('modal type invalid');
  }
}

export default Modal;
