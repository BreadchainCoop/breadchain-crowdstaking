import { ComponentMeta, ComponentStory } from '@storybook/react';
import { createWalletClient, http } from 'viem';
import { hardhat } from 'wagmi/dist/chains';
import {
  MockWagmiDecorator,
  ReactRouterDecorator,
} from '../../../.storybook/decorators';

import Header from './Header';

const DEMO_PK_1 =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const DEMO_ACCOUNT_1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

const demoWallet = createWalletClient({
  account: DEMO_ACCOUNT_1,
  key: DEMO_PK_1,
  chain: hardhat,
  transport: http('localhost:8545'),
});

export default {
  title: 'Core/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [MockWagmiDecorator(demoWallet), ReactRouterDecorator],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = function HeaderWrapper() {
  return <Header />;
};

export const Default = Template.bind({});
