import path from 'path';
import fs from 'fs-extra';
import { RollupOptions, OutputOptions, ModuleFormat } from 'rollup';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

interface PkgConfigInput {
  format: string;
  entry?: string;
  publicPath?: string;
  externals?: string[];
  sourcemap: boolean;
  minify: boolean;
  analyze: boolean;
}

export default async function createRollupConfig(config: PkgConfigInput): Promise<RollupOptions> {
  const packageJson = JSON.parse(fs.readFileSync(path.join(config.basePath, './package.json')).toString('utf-8'));

  const plugins = [
    postcss({
      plugins: [],
      minimize: true,
    }),
    resolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
    peerDepsExternal(),
    commonjs(),
    json(),
    typescript(),
  ];
  const output: OutputOptions = {
    name: packageJson.name,
    format: config.format as ModuleFormat,
    externalLiveBindings: false,
    sourcemap: true,
  };
  const externals = [];

  if (config.format === 'es') {
    output.dir = path.resolve(config.basePath, 'lib/esm');
    output.preserveModules = false;
  }

  if (config.format === 'cjs') {
    output.dir = path.resolve(config.basePath, 'lib/cjs');
    output.preserveModules = false;
    output.exports = 'named';
  }

  return {
    input: config?.entry || path.resolve(config.basePath, 'src/index.ts'),
    output,
    external: externals,
    plugins,
  };
}
