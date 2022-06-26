import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSeidrApi } from '../components/SeidrProvider';

function HookWrapper() {
  const api = useSeidrApi();
  return (
    <div>
      <div>{JSON.stringify(api)}</div>
    </div>
  );
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'hooks/useSeidrApi',
  component: HookWrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof HookWrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HookWrapper> = (args) => <HookWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {};
