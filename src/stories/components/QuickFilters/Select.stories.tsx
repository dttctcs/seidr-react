import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mantine/core';
import { Select } from '../../../components/QuickFilters';
import { DataGrid } from '../../../components/DataGrid';

const meta: Meta<typeof Select> = {
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
type Story = StoryObj<typeof Select>
export const Primary: Story = { args: { name: 'asset_name' } };