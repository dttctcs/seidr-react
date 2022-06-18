import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AuthProvider, useAuth } from '../components/AuthProvider';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AuthProvider',
  component: AuthProvider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AuthProvider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AuthProvider> = (args) => <AuthProvider {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  (Story) => {
    const App = () => {
      const auth = useAuth();
      return <div>Auth</div>;
    };

    return (
      <Story>
        <App />
      </Story>
    );
  },
];
Default.args = {};
