import type { Meta, StoryObj } from '@storybook/react';
import { SeidrApiProvider, useApi } from '../../components/SeidrApiProvider';
import { Story } from '@storybook/addon-docs';
import { Api } from '../../components/SeidrApiProvider/types';

const meta: Meta<typeof SeidrApiProvider> = {
  title: 'components/SeidrApiProvider',
  component: SeidrApiProvider,
};
export default meta;
type Story = StoryObj<typeof SeidrApiProvider>

function SeidrApiProviderComponent() {
  const { data, queryParams }: Api = useApi();
  return <>{queryParams ? JSON.stringify(data) : null}</>;
}

function SeidrApiProviderWrapper({ pathFirst, pathSecond }) {
  return (
    <SeidrApiProvider path={pathFirst}>
      <SeidrApiProviderComponent />
      <SeidrApiProvider path={pathSecond}>
        <SeidrApiProviderComponent />
      </SeidrApiProvider>
    </SeidrApiProvider>
  );
}

export const Primary: Story = {
  render: () => <SeidrApiProviderWrapper pathFirst={'assets'} pathSecond={'units'} />,
};