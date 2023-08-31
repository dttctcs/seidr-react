import { SeidrProvider, SeidrApiProvider } from '../src';
import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
export default preview;

export const decorators = [
  (Story) => {
    return (
      <SeidrProvider baseUrl='http://localhost:6060/api/v1'>
        <SeidrApiProvider path='/assets'>
          <Story />
        </SeidrApiProvider>
      </SeidrProvider>
    );
  },
];
