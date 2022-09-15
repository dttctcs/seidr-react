/* eslint-disable no-await-in-loop */
import chalk from 'chalk';
import { rollup } from 'rollup';
import createRollupConfig from './utils/create-rollup-config';
import { Logger } from './utils/Logger';

const logger = new Logger('build');

export interface BuildOptions {
  analyze: boolean;
  sourcemap: boolean;
  minify: boolean;
  formats: string[];
}

export async function buildPackage() {
  logger.info(`Building ${chalk.cyan('seidr-react')}`);
  try {
    const startTime = Date.now();
    const options = {
      formats: ['es', 'cjs'],
      sourcemap: true,
    };

    // compile
    // eslint-disable-next-line no-restricted-syntax
    for (const format of options.formats) {
      logger.info(`Building to ${chalk.cyan(format)} format...`);

      const config = await createRollupConfig({
        ...options,
        basePath: './',
        format,
        minify: false,
        analyze: false,
      });

      const build = await rollup(config);
      const outputs = Array.isArray(config.output) ? config.output : [config.output];
      await Promise.all(outputs.map((output) => build.write(output)));
    }
    logger.info(`seidr-react was built in ${chalk.green(`${((Date.now() - startTime) / 1000).toFixed(2)}s`)}`);
  } catch (err) {
    logger.error(`Failed to compile ${chalk.cyan('seidr-react')}`);
    process.stdout.write(`${err.toString('minimal')}\n`);

    process.exit(1);
  }
}
