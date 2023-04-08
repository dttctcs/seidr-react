import type { Meta, StoryObj } from '@storybook/react';
import { Button, Stack } from '@mantine/core';
import { useSeidrAuth } from '../../components/SeidrProvider';

function SeidrAuthWrapper() {
  const { user, signin } = useSeidrAuth();

  return (
    <Stack>
      {
        !user ? <Button onClick={() => signin({ username: 'admin', password: 'admin' })}>Sign in</Button> : null
      }
      <>{JSON.stringify(user)}</>
    </Stack>
  );
}


const meta: Meta<typeof SeidrAuthWrapper> = {
  title: 'hooks/useSeidrAuth',
  component: SeidrAuthWrapper,
};

export default meta;
type Story = StoryObj<typeof SeidrAuthWrapper>

export const Primary: Story = {};