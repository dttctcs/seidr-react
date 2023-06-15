import { createStyles } from '@mantine/core';

export default createStyles((theme, { rightBorder, rtl }) => ({
  field: {
    ...theme.fn.fontStyles(),
    fontSize: theme.fontSizes.sm,

    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: rtl ? 'right' : 'left',

    borderBottom: `1px solid ${theme.colors.gray[4]}`,
  },

  borderRight: {
    borderRight: rightBorder && `1px solid ${theme.colors.gray[4]}`,

    '&:last-of-type': {
      borderRight: 'none',
    },
  },
}));
