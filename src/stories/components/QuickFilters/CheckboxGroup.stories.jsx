import { Stack } from '@mantine/core';
import { CheckboxGroup } from '../../../components/QuickFilters';
import { DataGrid } from '../../../components/DataGrid';

const meta = {
  title: 'components/QuickFilters/CheckboxGroup',
  component: CheckboxGroup,
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
export const horizontal = { args: { name: 'asset_name', orientation: 'horizontal' } };
export const vertical= { args: { name: 'asset_name', orientation: 'vertical' } };