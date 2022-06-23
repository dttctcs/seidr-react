import { createStyles } from '@mantine/core';

export default createStyles((theme, { selectable, selectedColumn, rtl }) => ({
  fieldTitleRoot: {
    position: 'sticky',
    top: 0,
    padding: 0,
    zIndex: 20,

    backgroundColor: 'white',
  },
  fieldTitleWrapper: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: rtl ? 'row-reverse' : 'row',
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,

    borderBottom: `1px solid ${theme.colors.gray[4]}`,
    ...theme.fn.fontStyles(),
    fontSize: theme.fontSizes.sm,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    cursor: selectable ? 'pointer' : 'default',
    color: selectedColumn ? theme.colors[theme.primaryColor][theme.fn.primaryShade()] : null,
    '&:hover': {
      color: selectable ? (selectedColumn ? theme.colors.dark[4] : theme.colors.gray[6]) : null,
    },
  },
  fieldTitleName: {
    fontWeight: 700,
  },
  fieldTitleIcon: {
    display: 'flex',
    alignItems: 'center',
    visibility: !selectedColumn ? 'hidden' : 'visible',
  },
}));
