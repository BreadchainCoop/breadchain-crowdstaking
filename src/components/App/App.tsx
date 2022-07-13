import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import AppContainer from "./ui/AppContainer";
import Header from "../Header";
import * as Main from "./ui/Main";
import Footer from "../Footer";
import Modal from "../Modal";
import Logo from "../Header/Logo";
import * as WalletDisplay from "../Header/WalletDisplay";

import { getNetwork, ethInit } from "../../api";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setWalletAddress } from "../../features/wallet/walletSlice";
import {
  ENetwork,
  ENetworkConnectionState,
  setNetwork,
  setNetworkConnected,
} from "../../features/network/networkSlice";
import { formatAddress } from "../../util/formatWalletAddress";
import { setIsLoaded } from "../../features/font/fontSlice";

import Toast from "../Toast/Toast";
import { Pantry } from "../Pantry";
import Index from "../../routes/Index";
import DesktopNavigation from "../Navigation/DesktopNavigation";
import About from "../../routes/Info";
import MobileNavigationToggle from "../Header/MobileNavigationToggle";
import SiteTitle from "../SiteTitle/SiteTitle";
import { EToastType, setToast } from "../../features/toast/toastSlice";
import { useConnect, useNetwork, useAccount } from "wagmi";
import { useValidatedWalletConnection } from "../../hooks/useValidatedWalletConnection";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state);

  const { modal, toast, font } = appState;
  const { isConnected } = useConnect();
  const { data } = useAccount();
  const { status, error, activeChain, configuration, accountData } =
    useValidatedWalletConnection();

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

      if (status != "success") return;

      const network = getNetwork(activeChain!.id);
      if (!network) {
        // !!! handle this error
        dispatch(
          setToast({
            type: EToastType.ERROR,
            message: "Failed to get current network!",
          })
        );
        return;
      }

      dispatch(setNetwork(network));
      dispatch(setNetworkConnected(ENetworkConnectionState.CONNECTED));

      // bind handlers for metamask events eg account change / network change
      // ethInit(appState, dispatch);

      dispatch(setWalletAddress(accountData!.address!));
    })();
  }, [status, error, !!configuration]);

  return (
    <AppContainer>
      {modal.type !== null && <Modal modal={modal} />}
      {toast.type !== null && toast.message !== null && (
        <Toast type={toast.type} message={toast.message} />
      )}
      <Header>
        <Logo />
        <DesktopNavigation />
        <WalletDisplay.Container>
          {status === "success" && <WalletDisplay.Network />}
          {data?.address && (
            <WalletDisplay.Address>
              {formatAddress(data.address)}
            </WalletDisplay.Address>
          )}
        </WalletDisplay.Container>
        <MobileNavigationToggle />
      </Header>
      <SiteTitle />
      <Main.Main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pantry" element={<Pantry />} />
        </Routes>
      </Main.Main>

      <Footer>
        <Link to="/pantry" className="opacity-0 hover:opacity-100 px-4 py-2">
          pantry
        </Link>
      </Footer>
    </AppContainer>
  );
};

export default App;
