import { Button, Stack } from '@mantine/core';
import { useSeidrAuth, useSeidrInfo } from './index.js';

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

const meta = {
  title: 'hooks/useSeidrInfo',
  component: SeidrInfoWrapper,
};

export default meta;

export const Primary = {};
