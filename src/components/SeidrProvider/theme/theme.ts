export const THEME = {
  primaryColor: 'blue',
  components: {
    Tooltip: {
      styles: (theme) => ({
        body: {
          padding: 0.5 * theme.spacing.xs,
          paddingTop: 0.25 * theme.spacing.xs,
          paddingBottom: 0.25 * theme.spacing.xs,
          fontSize: theme.fontSizes.xs,
          backgroundColor: theme.colors.gray[6],
        },
      }),

      defaultProps: { position: 'bottom', transition: 'fade', openDelay: 400 },
    },
    Modal: {
      styles: {
        title: {
          fontWeight: 700,
        },
      },
    },
    ActionIcon: {
      styles: (theme) => ({
        hover: {
          color: theme.colors.gray[6],
        },
      }),
    },
  },
};
