import { createStyles } from '@mantine/core';

export default createStyles((theme, { dense }) => ({
  toolbarRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: dense ? 0.75 * '8px' : '8px',
  },
}));
