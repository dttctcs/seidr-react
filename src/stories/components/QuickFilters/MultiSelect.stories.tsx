import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mantine/core';
import { MultiSelect } from '../../../components/QuickFilters';
import { DataGrid } from '../../../components/DataGrid';

const meta: Meta<typeof MultiSelect> = {
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
type Story = StoryObj<typeof MultiSelect>
export const Primary: Story = { args: { name: 'asset_name' } };
