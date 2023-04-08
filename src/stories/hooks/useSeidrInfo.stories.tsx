import type { Meta, StoryObj } from '@storybook/react';
import { Button, Stack } from '@mantine/core';
import { useSeidrAuth, useSeidrInfo } from '../../components/SeidrProvider';

function SeidrInfoWrapper() {
  const { user, signin } = useSeidrAuth();
  const { baseUrl, info } = useSeidrInfo();

  return (
    <Stack>
      {
        !user ? <Button onClick={() => signin({ username: 'admin', password: 'admin' })}>Sign in</Button> : null
      }
      <>{JSON.stringify(baseUrl)}</>
      <>{JSON.stringify(info)}</>
    </Stack>
  );
}

const meta: Meta<typeof SeidrInfoWrapper> = {
  title: 'hooks/useSeidrInfo',
  component: SeidrInfoWrapper,
};

export default meta;
type Story = StoryObj<typeof SeidrInfoWrapper>

export const Primary: Story = {};
