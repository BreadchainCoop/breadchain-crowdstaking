import React from "react";
import ReactDOM from "react-dom";
import "./shims.ts";

import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./store";

import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";

import "./css/index.css";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const apiKey = import.meta.env.VITE_ALCHEMY_ID as string;

const supportedChains = [chain.polygonMumbai, chain.polygon];

const { chains, provider, webSocketProvider } = configureChains(
  supportedChains,
  [alchemyProvider({ apiKey }), publicProvider()]
);

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: { shimChainChangedDisconnect: false, shimDisconnect: false },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiConfig client={client}>
        <Provider store={store}>
          <HashRouter>
            <App />
          </HashRouter>
        </Provider>
      </WagmiConfig>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
