import { setupWorker } from 'msw';
import { handlers } from '../src/mocks/handlers';
import { SeidrProvider } from '../src/components/SeidrProvider';

if (typeof global.process === 'undefined') {
  const worker = setupWorker(...handlers);
  worker.start();
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
      <SeidrProvider>
        <Story />
      </SeidrProvider>
    );
  },
];
