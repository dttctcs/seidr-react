import { Stack } from '@mantine/core';
import { MultiSelect } from '../index.js';
import { DataGrid } from '../../DataGrid/index.js';

const meta = {
  title: 'Components/QuickFilters/MultiSelect',
  component: MultiSelect,
  decorators: [
    (Story) => (
      <Stack>
        <Story />
        <DataGrid />
      </Stack>
    ),
  ],
};

export default meta;
export const Primary= { args: { name: 'asset_name' } };
