import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import { hardhat, polygon } from 'wagmi/chains';
import './shims';

import { HashRouter } from 'react-router-dom';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import App from './components/App';
import './css/index.css';
import SubgraphProvider from './hooks/graphProvider';
import { ModalProvider } from './hooks/useModal';
import { ToastProvider } from './hooks/useToast';
import { TransactionDisplayProvider } from './hooks/useTransactionDisplay';

export type IViteMode = 'production' | 'development' | 'testing' | undefined;

const env = import.meta.env.MODE as IViteMode;

if (env === undefined) throw new Error('NODE_ENV not set!');

const container = document.getElementById('root');
if (!container) throw new Error('no root element found!');

const apiKey = import.meta.env.VITE_ALCHEMY_ID as string;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, hardhat],
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
  <StrictMode>
    <WagmiConfig config={config}>
      <SubgraphProvider>
        <ToastProvider>
          <ModalProvider>
            <TransactionDisplayProvider>
              <HashRouter>
                <App />
              </HashRouter>
            </TransactionDisplayProvider>
          </ModalProvider>
        </ToastProvider>
      </SubgraphProvider>
    </WagmiConfig>
  </StrictMode>,
);
