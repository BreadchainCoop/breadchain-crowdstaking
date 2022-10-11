import React from "react";
import { createRoot } from "react-dom/client";

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
import {
  hardhatChains,
  hardhatProvider,
  hardhatWebSocketProvider,
} from "../.storybook/decorators";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const apiKey = import.meta.env.VITE_ALCHEMY_ID as string;

const supportedChains = [chain.polygonMumbai, chain.polygon];

const { chains, provider, webSocketProvider } = configureChains(
  supportedChains,
  [alchemyProvider({ apiKey }), publicProvider()]
);

const prodClient = createClient({
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

const devClient = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains: hardhatChains,
      options: { shimChainChangedDisconnect: false, shimDisconnect: false },
    }),
    new InjectedConnector({
      chains: hardhatChains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains: hardhatChains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains: hardhatChains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider: hardhatProvider,
  webSocketProvider: hardhatWebSocketProvider,
});

const container = document.getElementById("root");
if (!container) throw new Error("no root element found!");

const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiConfig
        client={
          process.env.NODE_ENV === "development"
            ? devClient
            : process.env.NODE_ENV === "testing"
            ? devClient
            : prodClient
        }
      >
        <Provider store={store}>
          <HashRouter>
            <App />
          </HashRouter>
        </Provider>
      </WagmiConfig>
    </ErrorBoundary>
  </React.StrictMode>
);
