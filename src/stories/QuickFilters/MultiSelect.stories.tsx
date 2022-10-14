import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mantine/core';
import { SeidrApiProvider } from '../../components/SeidrApiProvider';
import { DataGrid } from '../../components/DataGrid';
import { MultiSelect } from '../../components/QuickFilters';

function Wrapper({ path }) {
  return (
    <div>
      <SeidrApiProvider path="/bus">
        <MultiSelect name="buStatic" orientation="vertical" />
        <MultiSelect name="buDynamic" />
        <Box sx={{ height: 1, minHeight: '400px' }}>
          <DataGrid settings={{ hover: true }} />
        </Box>
      </SeidrApiProvider>
    </div>
  );
}

export default {
  title: 'Components/QuickFilters/MultiSelect',
  component: Wrapper,

  args: {},
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => {
  return <Wrapper {...args} />;
};

export const Default = Template.bind({});
Default.decorators = [
  (Story) => (
    <div style={{ height: '400px', padding: '40px', margin: '3em' }}>
      <Story />
    </div>
  ),
];
