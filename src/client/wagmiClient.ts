import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
import { chain, configureChains } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import {
  hardhatChains,
  hardhatProvider,
  hardhatWebSocketProvider,
} from '../../.storybook/decorators';

import { IViteMode } from '../main';

const apiKey = import.meta.env.VITE_ALCHEMY_ID as string;

const supportedChains = [chain.polygon, chain.polygonMumbai];

const { chains, provider, webSocketProvider } = configureChains(
  supportedChains,
  [alchemyProvider({ apiKey }), publicProvider()],
);

export const getClient = (mode: IViteMode) => {
  switch (mode) {
    case 'production':
      return {
        autoConnect: false,
        connectors: [
          new MetaMaskConnector({
            chains,
            options: {
              shimChainChangedDisconnect: false,
              shimDisconnect: false,
            },
          }),
          new CoinbaseWalletConnector({
            chains: chains.filter((c) => c.name === 'polygon'),
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
          new SafeConnector({ chains }),
          // new WalletConnectConnector({
          //   chains,
          //   options: {
          //     qrcode: true,
          //   },
          // }),
        ],
        provider,
        webSocketProvider,
      };

    case 'development':
      return {
        autoConnect: false,
        connectors: [
          new MetaMaskConnector({
            chains: hardhatChains,
            options: {
              shimChainChangedDisconnect: false,
              shimDisconnect: false,
            },
          }),
          new CoinbaseWalletConnector({
            chains: hardhatChains,
            options: {
              appName: 'wagmi',
            },
          }),
          new InjectedConnector({
            chains: hardhatChains,
            options: {
              name: 'Injected',
              shimDisconnect: true,
            },
          }),
          new SafeConnector({ chains }),
        ],
        provider: hardhatProvider,
        webSocketProvider: hardhatWebSocketProvider,
      };
    case 'testing':
      return {
        autoConnect: false,
        connectors: [
          new MetaMaskConnector({
            chains: hardhatChains,
            options: {
              shimChainChangedDisconnect: false,
              shimDisconnect: false,
            },
          }),
          new InjectedConnector({
            chains: hardhatChains,
            options: {
              name: 'Injected',
              shimDisconnect: true,
            },
          }),
          new CoinbaseWalletConnector({
            chains: hardhatChains,
            options: {
              appName: 'wagmi',
            },
          }),
        ],
        provider: hardhatProvider,
        webSocketProvider: hardhatWebSocketProvider,
      };
    default:
      throw new Error('no client config available for NODE_ENV');
  }
};

export default getClient;
