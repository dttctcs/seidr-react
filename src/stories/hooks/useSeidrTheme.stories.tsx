import type { Meta, StoryObj } from '@storybook/react';
import { useSeidrTheme } from '../../components/SeidrProvider';

function MantineThemeWrapper() {
  const theme = useSeidrTheme();
  return (
    <div>
      <div>{JSON.stringify(theme)}</div>
    </div>
  );
}

const meta: Meta<typeof MantineThemeWrapper> = {
  title: 'hooks/useSeidrTheme',
  component: MantineThemeWrapper,
};

export default meta;
type Story = StoryObj<typeof MantineThemeWrapper>

export const Primary: Story = {};
