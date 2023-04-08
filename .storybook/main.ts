import { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
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
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
    },
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
};
export default config;