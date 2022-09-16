import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SeidrApiProvider, useApi } from '../components/SeidrApiProvider';
import { Button } from '@mantine/core';

function MyComponent() {
  const { data, queryParams } = useApi();

  console.log(data);
  return <>{queryParams ? JSON.stringify(data) : 'no data'}</>;
}

function MyParamsSetter() {
  const { path, queryParams, loading, setQueryParams } = useApi();

  const page = queryParams ? queryParams.page : -1;
  return (
    <Button onClick={() => setQueryParams({ page: page > 0 ? page - 1 : page + 1 })} loading={loading}>
      Set QueryPrams {path}
    </Button>
  );
}

function Wrapper({ pathFirst, pathSecond }) {
  return (
    <div>
      <SeidrApiProvider path={pathFirst}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <MyParamsSetter />
          <MyComponent />
          {pathSecond ? (
            <SeidrApiProvider path={pathSecond}>
              <MyParamsSetter />
              <MyComponent />
            </SeidrApiProvider>
          ) : null}
        </div>
      </SeidrApiProvider>
    </div>
  );
}

const defaultArgTypes = {
  path: {
    DataGrid: {
      disable: true,
    },
  },
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/SeidrApiProvider',
  component: SeidrApiProvider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Wrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Wrapper> = (args: any) => <Wrapper {...args} />;

export const Default = Template.bind({});
Default.args = { pathFirst: '/cars' };

export const Multiple = Template.bind({});
Multiple.args = {
  pathFirst: '/cars',
  pathSecond: '/engines',
};
Multiple.argTypes = {
  ...defaultArgTypes,
};
