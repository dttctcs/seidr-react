module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',

    '@storybook/addon-backgrounds',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
  ],
  framework: '@storybook/react',
  reactOptions: {
    fastRefresh: true,
    // strictMode: true, // causes issues
  },
};
