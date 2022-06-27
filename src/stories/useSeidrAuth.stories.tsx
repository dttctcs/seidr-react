import { useEffect } from 'react';
import { Button } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSeidrAuth } from '../components/SeidrProvider';

function HookWrapper() {
  const { user, getUser, resetPassword, signin, signout, update } = useSeidrAuth();

  return (
    <div>
      <Button loading={isLoading} onClick={() => signin({ username: 'admin', password: 'admin' })}>
        Signin
      </Button>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'hooks/useSeidrAuth',
  component: HookWrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof HookWrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HookWrapper> = (args) => <HookWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {};
