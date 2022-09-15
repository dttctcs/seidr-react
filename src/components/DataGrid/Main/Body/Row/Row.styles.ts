import { createStyles } from '@mantine/core';

export default createStyles((theme, { selected, selecDataGrid }) => {
  const colors = theme.fn.variant({
    color: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
    variant: 'light',
  });

  return {
    row: {
      backgroundColor: selected ? `${colors.background} !important` : undefined,

      ':hover': {
        cursor: selecDataGrid ? 'pointer' : 'default',
        backgroundColor: selected ? `${colors.hover} !important` : undefined,
      },
    },
  };
});
