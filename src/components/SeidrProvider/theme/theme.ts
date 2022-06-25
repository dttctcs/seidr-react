export const THEME = {
  primaryColor: 'blue',
  components: {
    Tooltip: {
      styles: (theme) => ({
        body: {
          padding: theme.spacing.sm,
          fontSize: theme.fontSizes.sm,
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
          color: theme.colors.gray[2],
        },
      }),
    },
  },
};
