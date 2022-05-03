import React from "react";
import {
  closeModal,
  EModalStatus,
  EModalType,
  IModalState,
} from "../../features/modal/modalSlice";
import { useAppDispatch } from "../../store/hooks";
import Elipsis from "../Elipsis/Elipsis";
import AddTokens from "./AddTokens";
import Spinner from "./Spinner";
import * as Modal from "./ui";

type TProps = {
  modal: IModalState;
};
const ShowModal: React.FC<TProps> = (props) => {
  const { modal } = props;
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    console.log("boomf");
    dispatch(closeModal());
  };
  switch (modal.type) {
    case EModalType.MINTING:
      return (
        <Modal.Container>
          <Modal.Inner>
            {modal.status === EModalStatus.UNLOCKED && (
              <button
                className="absolute right-0 top-0 p-4 text-neutral-500 text-xs"
                onClick={handleCloseModal}
              >
                X
              </button>
            )}
            <Modal.Heading>{modal.title}</Modal.Heading>
            {modal.status === EModalStatus.LOCKED && (
              <Modal.Message>
                Awaiting user response
                <Elipsis />
              </Modal.Message>
            )}

            {modal.status === EModalStatus.UNLOCKED && (
              <>
                <Modal.Message>Transaction in progress!</Modal.Message>
                <AddTokens />
              </>
            )}
          </Modal.Inner>
        </Modal.Container>
      );
    case EModalType.BURNING:
      return (
        <Modal.Container>
          <Modal.Inner>
            {modal.status === EModalStatus.UNLOCKED && (
              <button
                className="absolute right-0 top-0 p-4 text-neutral-500 text-xs"
                onClick={handleCloseModal}
              >
                X
              </button>
            )}
            <Modal.Heading>{modal.title}</Modal.Heading>
            {modal.status === EModalStatus.LOCKED && (
              <Modal.Message>
                Awaiting user response
                <Elipsis />
              </Modal.Message>
            )}

            {modal.status === EModalStatus.UNLOCKED && (
              <>
                <Modal.Message>Transaction in progress!</Modal.Message>
                <AddTokens />
              </>
            )}
          </Modal.Inner>
        </Modal.Container>
      );
    case EModalType.CONNECT_WALLET:
      return (
        <Modal.Container>
          <Modal.Inner>
            <Modal.Heading>Connecting Wallet</Modal.Heading>
            <Modal.Message>
              Awaiting user response
              <Elipsis />
            </Modal.Message>
          </Modal.Inner>
        </Modal.Container>
      );
    case EModalType.APPROVAL:
      return (
        <Modal.Container>
          <Modal.Inner>
            <Modal.Heading>Approving Contract</Modal.Heading>
            <Modal.Message>
              Awaiting user response
              <Elipsis />
            </Modal.Message>
          </Modal.Inner>
        </Modal.Container>
      );
    case EModalType.CHANGE_NETWORK:
      return (
        <Modal.Container>
          <Modal.Inner>
            <Modal.Heading>Changing Network</Modal.Heading>
            <Modal.Message>
              Awaiting user response
              <Elipsis />
            </Modal.Message>
          </Modal.Inner>
        </Modal.Container>
      );
    case EModalType.CHANGING_NETWORK:
      return (
        <Modal.Container>
          <Modal.Inner>
            <Modal.Heading>Changing Network...</Modal.Heading>
            <Modal.Message>please wait a moment!</Modal.Message>
          </Modal.Inner>
        </Modal.Container>
      );
    default:
      return (
        <Modal.Container>
          <Spinner size="lg" color="#303030" />
        </Modal.Container>
      );
  }
};

export default ShowModal;
