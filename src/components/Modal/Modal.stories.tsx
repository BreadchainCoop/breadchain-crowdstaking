import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ModalProvider } from '../../hooks/useModal';
import Modal from './Modal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modal',
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   status: { control: 'status' },
  // },
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = function ModalWrapper(args) {
  return (
    <ModalProvider>
      <div
        style={{
          transform: 'scale(1)',
          height: '100vh',
        }}
      >
        <Modal
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...args}
        />
      </div>
    </ModalProvider>
  );
};

export const ConnectWallet = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ConnectWallet.args = {
  type: 'CONNECT_WALLET',
  status: 'LOCKED',
};

export const ChangeNetwork = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ChangeNetwork.args = {
  type: 'CHANGE_NETWORK',
  status: 'LOCKED',
};

export const ChangingNetwork = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ChangingNetwork.args = {
  type: 'CHANGING_NETWORK',
  status: 'LOCKED',
};

export const ApproveContract = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ApproveContract.args = {
  type: 'APPROVAL',
  status: 'UNLOCKED',
};

export const Baking = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Baking.args = {
  type: 'BAKING',
  status: 'LOCKED',
  title: 'Baking XXX BREAD',
};

export const Burning = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Burning.args = {
  type: 'BURNING',
  status: 'LOCKED',
  title: 'Burning XXX BREAD',
};
