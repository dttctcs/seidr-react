import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';
import { SeidrProvider } from '../src';

initialize();

// if (typeof global.process === 'undefined') {
//   const worker = setupWorker(...handlers);
//   worker.start({ onUnhandledRequest: 'bypass' });
// }

const preview = {
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
        <Story />
      </SeidrProvider>
    );
  },
];
