import { createStyles } from '@mantine/core';

export default createStyles((theme, { selected, pointer, hover }) => {
  const colors = theme.fn.variant({
    color: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
    variant: 'light',
  });

  return {
    row: {
      backgroundColor: selected ? `${colors.background} !important` : undefined,

      ':hover': {
        cursor: pointer ? 'pointer' : 'default',
        backgroundColor: hover ? `${colors.hover} !important` : undefined,
      },
    },
  };
});
