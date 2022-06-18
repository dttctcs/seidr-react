import { ComponentStory, ComponentMeta } from '@storybook/react';

function HookDummy() {
  return <div>Test useAuth hook</div>;
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'hooks/useAuth',
  component: HookDummy,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof HookDummy>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HookDummy> = (args) => <HookDummy {...args} />;

export const Default = Template.bind({});
Default.args = {};
