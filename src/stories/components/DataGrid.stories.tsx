import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from '../../components/DataGrid';

const meta: Meta<typeof DataGrid> = {
  title: 'components/DataGrid',
  component: DataGrid
};
export default meta;
type Story = StoryObj<typeof DataGrid>
export const Primary: Story = {};