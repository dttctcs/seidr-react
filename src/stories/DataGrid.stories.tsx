import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mantine/core';
import { SeidrApiProvider } from '../components/SeidrApiProvider';
import { DataGrid } from '../components/DataGrid';
import { DataGridStyles } from '../components/DataGrid';
import { generateBorderStyles } from '../utils';

function Wrapper({ path }) {
  return (
    <div>
      <SeidrApiProvider path={path}>
        <Box sx={{ height: 1, minHeight: '400px' }}>
          <DataGrid />
        </Box>
      </SeidrApiProvider>
    </div>
  );
}

export default {
  title: 'Components/DataGrid',
  component: Wrapper,

  args: {},
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => {
  return <Wrapper {...args} />;
};

const defaultArgTypes = {
  queryParams: {
    DataGrid: {
      disable: true,
    },
  },
  rowsPerPageProps: {
    DataGrid: {
      disable: true,
    },
  },
  relation: {
    DataGrid: {
      disable: true,
    },
  },
  AddComponent: {
    DataGrid: {
      disable: true,
    },
  },
  EditComponent: {
    DataGrid: {
      disable: true,
    },
  },
  ViewComponent: {
    DataGrid: {
      disable: true,
    },
  },
  onError: {
    DataGrid: {
      disable: true,
    },
  },
  onSelectEntry: {
    DataGrid: {
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
  path: 'cars',
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
  path: 'cars',
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
  path: 'cars',
};
Theming.argTypes = {
  ...defaultArgTypes,
};
