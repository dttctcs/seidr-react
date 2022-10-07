import { RollupOptions } from 'rollup';
import dts from 'rollup-plugin-dts';

export default function createRollupDtsConfig(): RollupOptions {
  const plugins = [dts()];

  return {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],

    plugins,
  };
}
