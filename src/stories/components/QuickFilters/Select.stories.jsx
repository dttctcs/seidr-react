import { Stack } from '@mantine/core';
import { Select } from '../../../components/QuickFilters';
import { DataGrid } from '../../../components/DataGrid';

const meta = {
  title: 'Components/QuickFilters/Select',
  component: Select,
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
export const Primary = { args: { name: 'asset_name' } };