import { setupWorker } from 'msw';
import { handlers } from '../src/mocks/handlers';
import { SeidrProvider } from '../src';

if (typeof global.process === 'undefined') {
  const worker = setupWorker(...handlers);
  worker.start({ onUnhandledRequest: 'bypass' });
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    return (
      <SeidrProvider baseUrl="http://localhost:6006/api/v1" inheritMantineTheme>
        <Story />
      </SeidrProvider>
    );
  },
];
