import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSeidrTheme } from '../components/SeidrProvider';

function HookWrapper() {
  const theme = useSeidrTheme();
  return (
    <div>
      <div>{JSON.stringify(theme)}</div>
    </div>
  );
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'hooks/useSeidrTheme',
  component: HookWrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof HookWrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HookWrapper> = (args) => <HookWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {};
