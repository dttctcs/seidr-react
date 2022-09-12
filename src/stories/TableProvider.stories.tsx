import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TableProvider, useTable } from '../components/TableProvider';

function Table() {
  const { data, queryParams } = useTable();

  return <>{queryParams ? JSON.stringify(data) : 'no data'}</>;
}

function Wrapper({ pathFirst, pathSecond }) {
  return (
    <div>
      <TableProvider path={pathFirst}>
        <Table />
      </TableProvider>
      {pathSecond ? (
        <TableProvider path={pathSecond}>
          <Table />
        </TableProvider>
      ) : null}
    </div>
  );
}

const defaultArgTypes = {
  path: {
    table: {
      disable: true,
    },
  },
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/TableProvider',
  component: TableProvider,
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
