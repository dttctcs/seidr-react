import { createStyles } from '@mantine/core';

export default createStyles((theme, { loading, rightBorder, rtl }) => ({
  field: {
    ...theme.fn.fontStyles(),
    fontSize: theme.fontSizes.sm,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
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
