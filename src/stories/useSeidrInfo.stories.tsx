import { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSeidrInfo } from '../components/SeidrProvider';

function HookWrapper() {
  const { fetchSeidrInfo } = useSeidrInfo();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const infoPromise = fetchSeidrInfo();
    infoPromise
      .then((data) => {
        setInfo(data);
      })
      .catch((e) => console.log(e));
  });

  return (
    <div>
      <div>{JSON.stringify(info)}</div>
    </div>
  );
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'hooks/useSeidrInfo',
  component: HookWrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof HookWrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HookWrapper> = (args) => <HookWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {};
