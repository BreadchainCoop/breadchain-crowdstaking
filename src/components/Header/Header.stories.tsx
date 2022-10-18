import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  MockWagmiDecorator,
  ReactRouterDecorator,
} from "../../../.storybook/decorators";
import { Wallet } from "ethers";

import Header from "./Header";

// 👇 Components within this story will act as though they are connected to this wallet
const demoWallet = new Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
);

export default {
  title: "Core/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [MockWagmiDecorator(demoWallet), ReactRouterDecorator],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});
