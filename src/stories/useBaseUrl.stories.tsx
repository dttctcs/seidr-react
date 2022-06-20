import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSeidrBaseURL } from '../components/SeidrProvider';

function HookWrapper() {
  const baseURL = useSeidrBaseURL();
  return (
    <div>
      <div>Test useSeidrBaseURL hook</div>
      <div>{JSON.stringify(baseURL)}</div>
    </div>
  );
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'hooks/useSeidrBaseUrl',
  component: HookWrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof HookWrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HookWrapper> = (args) => <HookWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {};
