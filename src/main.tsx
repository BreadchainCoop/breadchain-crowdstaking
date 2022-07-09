import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./store";

import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";

import "./css/index.css";
import {
  WagmiConfig,
  createClient,
  chain,
  configureChains,
  defaultChains,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

const alchemyId = import.meta.env.VITE_ALCHEMY_ID as string;
import { alchemyProvider } from "wagmi/providers/alchemy";

const supportedChains = [chain.polygonMumbai, chain.polygon];

const { chains, provider, webSocketProvider } = configureChains(
  supportedChains,
  [alchemyProvider({ alchemyId })]
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

// ReactDOM.render(
//   <React.StrictMode>
//     <ErrorBoundary>
//       <Provider store={store}>
//         <HashRouter>
//           <App />
//         </HashRouter>
//       </Provider>
//     </ErrorBoundary>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
