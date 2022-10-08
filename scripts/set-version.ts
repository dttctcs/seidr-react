import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { setPackageVersion } from './utils/set-package-version';

import { Logger } from './utils/Logger';

const logger = new Logger('build');

export async function setPackageVersion(version: string) {
  const packageJsonPath = path.join(__dirname, '../package.json');

  const current = await fs.readJSON(packageJsonPath);
  current.version = version;

  await fs.writeJSON(packageJsonPath, current, { spaces: 2 });
}

const { argv }: { argv: any } = yargs(hideBin(process.argv)).option('tag', {
  type: 'string',
  default: 'latest',
  description: 'Tag',
});

(async () => {
  const version = argv._[0];
  logger.info(`Updating package.json version...`);
  await setPackageVersion(version);
  logger.success(`Updated package.json version: ${chalk.cyan(version)}`);
})();
