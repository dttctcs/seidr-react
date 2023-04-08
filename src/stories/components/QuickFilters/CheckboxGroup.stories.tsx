import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mantine/core';
import { CheckboxGroup } from '../../../components/QuickFilters';
import { DataGrid } from '../../../components/DataGrid';

const meta: Meta<typeof CheckboxGroup> = {
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
type Story = StoryObj<typeof CheckboxGroup>
export const horizontal: Story = { args: { name: 'asset_name', orientation: 'horizontal' } };
export const vertical: Story = { args: { name: 'asset_name', orientation: 'vertical' } };