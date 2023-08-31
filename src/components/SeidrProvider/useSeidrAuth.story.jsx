import { Button, Stack } from '@mantine/core';
import { useSeidrAuth } from './index.js';

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


const meta = {
  title: 'hooks/useSeidrAuth',
  component: SeidrAuthWrapper,
};

export default meta;

export const Primary = {};