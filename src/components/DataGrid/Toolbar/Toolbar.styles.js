import { createStyles } from '@mantine/core';

export default createStyles((theme, { dense }) => ({
  toolbarRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    paddingBottom: dense ? 0.5 * theme.spacing.xs : theme.spacing.md,
  },
}));
