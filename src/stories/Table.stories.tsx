import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TableProvider } from '../components/TableProvider';
import { DataGrid } from '../components/Table';
import { DataGridStyles } from '../components/Table';
import { generateBorderStyles } from '../utils';

function Wrapper() {
  return (
    <div>
      <TableProvider path={'http://localhost:5005/api/v1/employees'}>
        <DataGrid />
      </TableProvider>
    </div>
  );
}

export default {
  title: 'Components/Table',
  component: Wrapper,

  args: {},
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => {
  return <Wrapper {...args} />;
};

const defaultArgTypes = {
  queryParams: {
    table: {
      disable: true,
    },
  },
  rowsPerPageProps: {
    table: {
      disable: true,
    },
  },
  relation: {
    table: {
      disable: true,
    },
  },
  AddComponent: {
    table: {
      disable: true,
    },
  },
  EditComponent: {
    table: {
      disable: true,
    },
  },
  ViewComponent: {
    table: {
      disable: true,
    },
  },
  onError: {
    table: {
      disable: true,
    },
  },
  onSelectEntry: {
    table: {
      disable: true,
    },
  },
};

export const Default = Template.bind({});
Default.decorators = [
  (Story) => (
    <div style={{ height: '400px', padding: '40px', margin: '3em' }}>
      <Story />
    </div>
  ),
];
Default.args = {
  path: window.location.origin + '/cars/',
};
Default.argTypes = {
  ...defaultArgTypes,
};

export const StylesAPI = Template.bind({});
StylesAPI.decorators = [
  (Story, ctx) => {
    return (
      <div style={{ height: '400px', padding: '40px', margin: '3em' }}>
        <Story />
      </div>
    );
  },
];
StylesAPI.args = {
  path: window.location.origin + '/cars/',
  styles: generateBorderStyles(DataGridStyles),
};
StylesAPI.argTypes = {
  ...defaultArgTypes,
};

export const Theming = Template.bind({});
Theming.decorators = [
  (Story, ctx) => {
    return (
      <div style={{ height: '400px', padding: '40px', margin: '3em' }}>
        <Story />
      </div>
    );
  },
];
Theming.args = {
  path: window.location.origin + '/cars/',
};
Theming.argTypes = {
  ...defaultArgTypes,
};
