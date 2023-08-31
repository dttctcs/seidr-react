import { useSeidrTheme } from './index.js';

function MantineThemeWrapper() {
  const theme = useSeidrTheme();
  return (
    <div>
      <div>{JSON.stringify(theme)}</div>
    </div>
  );
}

const meta= {
  title: 'hooks/useSeidrTheme',
  component: MantineThemeWrapper,
};

export default meta;

export const Primary = {};
