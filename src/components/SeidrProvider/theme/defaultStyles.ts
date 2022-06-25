export const DEFAULT_STYLES = {
  ActionIcon: (theme) => ({
    hover: {
      color: theme.colors.gray[6],
    },
  }),

  Modal: {
    title: {
      fontWeight: 700,
    },
  },
  Tooltip: (theme) => ({
    body: {
      padding: 0.5 * theme.spacing.xs,
      paddingTop: 0.25 * theme.spacing.xs,
      paddingBottom: 0.25 * theme.spacing.xs,
      fontSize: theme.fontSizes.xs,
      backgroundColor: theme.colors.gray[6],
    },
  }),
};
