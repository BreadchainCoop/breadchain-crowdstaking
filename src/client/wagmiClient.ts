import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
import { configureChains } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import {
  hardhatChains,
  hardhatPublicClient,
  hardhatWebSocketPublicClient,
} from '../../.storybook/decorators';

import { IViteMode } from '../main';

const apiKey = import.meta.env.VITE_ALCHEMY_ID as string;

const { publicClient, webSocketPublicClient, chains } = configureChains(
  [polygon, polygonMumbai],
  [alchemyProvider({ apiKey }), publicProvider()],
);

export const getClient = (mode: IViteMode) => {
  switch (mode) {
    // case 'production':
    //   return {
    //     autoConnect: false,
    //     connectors: [
    //       new MetaMaskConnector({
    //         chains,
    //         options: {
    //           shimChainChangedDisconnect: false,
    //           shimDisconnect: false,
    //         },
    //       }),
    //       new CoinbaseWalletConnector({
    //         chains,
    //         options: {
    //           appName: 'wagmi',
    //         },
    //       }),
    //       new InjectedConnector({
    //         chains,
    //         options: {
    //           name: 'Injected',
    //           shimDisconnect: true,
    //         },
    //       }),
    //       new SafeConnector({ chains }),
    //       new WalletConnectConnector({
    //         chains,
    //         options: {
    //           qrcode: true,
    //         },
    //       }),
    //     ],
    //     provider,
    //     webSocketProvider,
    //   };

    case 'development':
      return {
        autoConnect: true,
        publicClient,
        webSocketPublicClient,
        connectors: [
          new MetaMaskConnector({
            chains: hardhatChains,

            // options: {
            //   shimChainChangedDisconnect: false,
            //   shimDisconnect: false,
            // },
          }),
          // new CoinbaseWalletConnector({
          //   chains: hardhatChains,
          //   publicClient,
          //   webSocketPublicClient,
          //   options: {
          //     appName: 'wagmi',
          //   },
          // }),
          // new InjectedConnector({
          //   chains: hardhatChains,
          //   publicClient,
          //   webSocketPublicClient,
          //   options: {
          //     name: 'Injected',
          //     shimDisconnect: true,
          //   },
          // }),
          // new WalletConnectConnector({
          //   chains,
          //   options: {
          //     qrcode: true,
          //   },
          // }),
          new SafeConnector({ chains }),
        ],
        // provider: hardhatProvider,
        // webSocketProvider: hardhatWebSocketProvider,
      };
    case 'testing':
      return {
        autoConnect: false,
        connectors: [
          new MetaMaskConnector({
            chains: hardhatChains,
            // options: {
            //   shimChainChangedDisconnect: false,
            //   shimDisconnect: false,
            // },
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
        publicClient: hardhatPublicClient,
        webSocketPublicClient: hardhatWebSocketPublicClient,
      };
    default:
      throw new Error('no client config available for NODE_ENV');
  }
};

export default getClient;
