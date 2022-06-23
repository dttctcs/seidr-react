import { createStyles } from '@mantine/core';

export default createStyles((theme, { selected, selectable }) => {
  const colors = theme.fn.variant({ color: theme.colors[theme.primaryColor][theme.fn.primaryShade()] });

  return {
    row: {
      backgroundColor: selected ? `${colors.background} !important` : undefined,
      color: selected ? `${colors.color} !important` : undefined,
      ':hover': {
        cursor: selectable ? 'pointer' : 'default',
        backgroundColor: selected ? `${colors.hover} !important` : undefined,
      },
    },
  };
});
