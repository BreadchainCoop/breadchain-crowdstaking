import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import AppContainer from "./ui/AppContainer";
import Header from "../Header";
import * as Main from "./ui/Main";
import Footer from "../Footer";
import Modal from "../Modal";
import Logo from "../Header/Logo";
import * as WalletDisplay from "../Header/WalletDisplay";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { formatAddress } from "@/util";
import { setIsLoaded } from "../../features/font/fontSlice";

import Toast from "../Toast/Toast";
import { Pantry } from "../Pantry";
import Index from "../../routes/Index";
import DesktopNavigation from "../Navigation/DesktopNavigation";
import About from "../../routes/Info";
import MobileNavigationToggle from "../Header/MobileNavigationToggle";
import SiteTitle from "../SiteTitle/SiteTitle";
import { useAccount } from "wagmi";
import { useToast } from "../../context/ToastContext";

const App: React.FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state);

  const { modal, font } = appState;
  const { address: accountAddress } = useAccount();

  const { state: toast } = useToast();

  /**
   * App Init
   */
  React.useEffect(() => {
    (async () => {
      document.fonts.ready.then(() => {
        if (!font.isLoaded) dispatch(setIsLoaded(true));
      });
    })();
  });

  return (
    <AppContainer>
      {modal.type !== null && <Modal modal={modal} />}
      {toast && <Toast type={toast.type} message={toast.message} />}
      <Header>
        <Logo />
        <DesktopNavigation />
        <WalletDisplay.Container>
          {<WalletDisplay.Network />}
          {accountAddress && (
            <WalletDisplay.Address>
              {formatAddress(accountAddress)}
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
