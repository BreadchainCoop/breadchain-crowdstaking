import { Wallet } from "ethers";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Story } from "@storybook/react";

import { HashRouter, Route, Routes } from "react-router-dom";

export const {
  chains: hardhatChains,
  provider: hardhatProvider,
  webSocketProvider: hardhatWebSocketProvider,
} = configureChains(
  [{ ...chain.hardhat, id: 1337 }],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "http://localhost:8545",
        webSocket: "ws://localhost:8545",
      }),
    }),
  ]
);

/**
 * A wagmi client which provides access to the given Wallet instance.
 */
export const mockWagmiClient = (wallet: Wallet) => {
  console.log(chain.hardhat);

  return createClient({
    autoConnect: true,
    provider: hardhatProvider,
    webSocketProvider: hardhatWebSocketProvider,
    connectors: [
      new MockConnector({
        chains: hardhatChains,
        options: {
          signer: wallet,
          chainId: 31337,
        },
      }),
    ],
  });
};

/**
 * A storybook decorator which wraps components in a mock wagmi context.
 */
export const MockWagmiDecorator = (wallet: Wallet) => (Story: Story) => {
  return (
    <WagmiConfig client={mockWagmiClient(wallet)}>
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
