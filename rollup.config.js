import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from './package.json';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
      }),
      peerDepsExternal(),
      resolve(),
      commonjs({ include: 'node_modules/**' }),
      json(),
      typescript(),
    ],
  },
];
