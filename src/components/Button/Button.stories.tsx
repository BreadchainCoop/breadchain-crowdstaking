import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = function ButtonWrapper(args) {
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return <Button {...args} />;
};

export const Regular = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Regular.args = {
  children: 'Default',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  disabled: true,
};

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
  children: 'Small',
  variant: 'small',
};

export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
  children: 'Large',
  variant: 'large',
};

export const FullWidth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FullWidth.args = {
  children: 'Full Width',
  variant: 'large',
  fullWidth: true,
};
