import { SeidrApiProvider, useApi } from '../../components/SeidrApiProvider';
import { Story } from '@storybook/addon-docs';

const meta = {
  title: 'components/SeidrApiProvider',
  component: SeidrApiProvider,
};
export default meta;

function SeidrApiProviderComponent() {
  const { data, queryParams } = useApi();
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

export const Primary = {
  render: () => <SeidrApiProviderWrapper pathFirst={'assets'} pathSecond={'units'} />,
};