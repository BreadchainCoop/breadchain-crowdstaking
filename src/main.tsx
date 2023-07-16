import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import { polygon } from 'wagmi/chains';
import './shims';

import { HashRouter } from 'react-router-dom';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import App from './components/App';
import { ModalProvider } from './context/ModalContext';
import { ToastProvider } from './context/ToastContext';
import { TransactionDisplayProvider } from './context/TransactionDisplayContext';
import './css/index.css';

export type IViteMode = 'production' | 'development' | 'testing' | undefined;

const env = import.meta.env.MODE as IViteMode;

if (env === undefined) throw new Error('NODE_ENV not set!');

const container = document.getElementById('root');
if (!container) throw new Error('no root element found!');

const apiKey = import.meta.env.VITE_ALCHEMY_ID as string;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [alchemyProvider({ apiKey }), publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ToastProvider>
        <ModalProvider>
          <TransactionDisplayProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </TransactionDisplayProvider>
        </ModalProvider>
      </ToastProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
