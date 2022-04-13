import React from "react";

import AppContainer from "./ui/AppContainer";
import Header from "../Header";
import * as Main from "./ui/Main";
import Swap from "../Swap";
import Footer from "../Footer";
import Modal from "../Modal";
import Logo from "../Header/Logo";
import * as Title from "../Header/Title";
import * as Navigation from "../Header/Navigation";
import ConnectWallet from "../ConnectWalletButton/ConnectWalletButton";
import WalletDisplay from "../WalletDisplay";
import UnsupportedNetwork from "../UnsupportedNetwork/UnsupportedNetwork";

import { getAllowance, getNetwork, ethInit } from "../../api";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setWalletAddress } from "../../features/wallet/walletSlice";
import {
  ENetwork,
  setNetwork,
  setXr,
} from "../../features/network/networkSlice";
import { getXr } from "../../api/getXr";
import { formatAddress } from "../../util/formatWalletAddress";
import { setIsLoaded } from "../../features/font/fontSlice";
import {
  setApprovalLoading,
  setApproved,
  setNotApproved,
} from "../../features/approval/approvalSlice";
import Toast from "../Toast/Toast";
import { EToastType, setToast } from "../../features/toast/toastSlice";
import { getBalances } from "../../features/wallet/walletSlice";
import { EModalStatus, EModalType } from "../../features/modal/modalSlice";
import TextTransition from "../../transitions/TextTransition";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state);

  const { modal, wallet, network, toast, font } = appState;

  /**
   * App Init
   */
  React.useEffect(() => {
    (async () => {
      document.fonts.ready.then(() => {
        if (!font.isLoaded) dispatch(setIsLoaded(true));
      });

      // getXr().then((data) => {
      //   dispatch(setXr(data));
      // });

      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        console.log("metamask or similar not installed!!");
        return;
      }

      console.log(Object.keys(ethereum));
      console.log(ethereum);

      // setEthereum(ethereum);
      if (ethereum.isConnected && !ethereum.isConnected()) {
        dispatch(
          setToast({
            type: EToastType.ERROR,
            message: "ethereum / MetaMask not connected!!!",
          })
        );
      }

      const network = await getNetwork();
      if (!network) {
        console.error("No chain ID could be determined!");
        return;
      }

      dispatch(setNetwork(network));

      // binds handlers for metamask events eg account change / network change
      ethInit(appState, dispatch);

      // If there is an address stored we can check how recently wallet was connected
      const storedAccount = localStorage.getItem("storedAccount");
      if (!storedAccount) return;

      const account = JSON.parse(storedAccount);
      // ignore stored account if more than an hour old
      if (Date.now() - account.timestamp > 360_000) {
        localStorage.removeItem("storedAccount");
        return;
      }

      dispatch(setWalletAddress(account.account));

      if (network === ENetwork.UNSUPPORTED) {
        ethInit(appState, dispatch);
        return;
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!wallet.address || !network.network) return;
      // have address now get balances
      dispatch(getBalances({}));

      dispatch(setApprovalLoading());
      const allowance = await getAllowance(wallet.address, network.network);

      if (!allowance) {
        dispatch(
          setToast({
            type: EToastType.ERROR,
            message: "Failed to get allowance!",
          })
        );
        return;
      }

      if (allowance.value > 0) dispatch(setApproved());
      if (allowance.value === 0) dispatch(setNotApproved());
    })();
  }, [wallet.address]);
  console.log(toast);

  console.log("\n\n: network: ", network.network);

  return (
    <AppContainer>
      {/* <Modal
        modal={{
          type: EModalType.MINTING,
          status: EModalStatus.UNLOCKED,
          title: "Minting 100.435 BREAD",
        }}
      /> */}
      {modal.type !== null && <Modal modal={modal} />}
      {toast.type !== null && toast.message !== null && (
        <Toast type={toast.type} message={toast.message} />
      )}
      <Header>
        <Logo>
          <TextTransition>logo</TextTransition>
        </Logo>
        <Title.Title>
          <Title.H1>
            <TextTransition>BREADCHAIN</TextTransition>
          </Title.H1>
          <Title.H2>
            <TextTransition>Crowdstaking</TextTransition>
          </Title.H2>
        </Title.Title>
        <Navigation.Nav>
          {network.network && <Navigation.Network network={network.network} />}
          {wallet.address && (
            <WalletDisplay>{formatAddress(wallet.address)}</WalletDisplay>
          )}
        </Navigation.Nav>
      </Header>
      <Main.Main>
        {(() => {
          if (network.network === ENetwork.UNSUPPORTED)
            return (
              <Main.Inner>
                <UnsupportedNetwork />
              </Main.Inner>
            );
          if (wallet.address)
            return (
              <Main.Inner>
                <Swap />
              </Main.Inner>
            );
          return (
            <Main.Inner>
              <ConnectWallet />
            </Main.Inner>
          );
        })()}

        {/* {wallet.address && <Transactions />} */}
      </Main.Main>
      <Footer>bloop</Footer>
    </AppContainer>
  );
};

export default App;
