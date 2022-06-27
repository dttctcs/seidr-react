import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSeidrAuth, useSeidrInfo } from '../components/SeidrProvider';

function HookWrapper() {
  const { signin } = useSeidrAuth();
  const { baseURL, apis } = useSeidrInfo();

  return (
    <div>
      <Button onClick={() => signin({ username: 'admin', password: 'admin' })}>Signin</Button>
      <div>{JSON.stringify(baseURL)}</div>
      <div>{JSON.stringify(apis)}</div>
    </div>
  );
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'hooks/useSeidrInfo',
  component: HookWrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof HookWrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HookWrapper> = (args) => <HookWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {};
