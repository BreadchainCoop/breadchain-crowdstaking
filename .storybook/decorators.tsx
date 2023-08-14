import { Story } from '@storybook/react';
import { MockConnector } from '@wagmi/core/connectors/mock';
import { HashRouter, Route, Routes } from 'react-router-dom';
import {
  configureChains,
  createConfig,
  WagmiConfig,
  WalletClient,
} from 'wagmi';
import { hardhat } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const apiKey = import.meta.env.VITE_ALCHEMY_ID as string;

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [polygon, hardhat],
//   [alchemyProvider({ apiKey }), publicProvider()],
// );

export const {
  chains: hardhatChains,
  publicClient,
  webSocketPublicClient,
} = configureChains(
  [{ ...hardhat, id: 1337 }],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: 'http://localhost:8545',
        webSocket: 'ws://localhost:8545',
      }),
    }),
  ],
);

/**
 * A wagmi client which provides access to the given Wallet instance.
 */
export const mockWagmiConfig = (wallet: WalletClient) => {
  return createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
      new MockConnector({
        chains: hardhatChains,
        options: {
          walletClient: wallet,
          chainId: 31337,
        },
      }),
    ],
  });
};

/**
 * A storybook decorator which wraps components in a mock wagmi context.
 */
export const MockWagmiDecorator = (wallet: WalletClient) => (Story: Story) => {
  return (
    <WagmiConfig config={mockWagmiConfig(wallet)}>
      <Story />
    </WagmiConfig>
  );
};

export const ReactRouterDecorator = (Story: Story) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </HashRouter>
  );
};

export { publicClient as hardhatPublicClient };
export { webSocketPublicClient as hardhatWebSocketPublicClient };
