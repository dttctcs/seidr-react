import open from 'open';
import path from 'path';
import chalk from 'chalk';
import simpleGit from 'simple-git';
import githubRelease from 'new-github-release-url';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { setPackageVersion } from './utils/set-package-version';
import { getIncrementedVersion } from './utils/get-incremented-version';

import { buildPackage } from './build';
import { Logger } from './utils/Logger';
import packageJson from '../package.json';

const logger = new Logger('build');
const git = simpleGit();

const { argv }: { argv: any } = yargs(hideBin(process.argv)).option('tag', {
  type: 'string',
  default: 'latest',
  description: 'Tag',
});

(async () => {
  // const status = await git.status();

  // if (status.files.length !== 0) {
  //   logger.error('Working tree is not clean');
  //   process.exit(1);
  // }

  logger.info('Release initiated');
  // build
  let build = await buildPackage();

  // increment version
  logger.info(`Creating new version...`);
  let incrementedVersion = getIncrementedVersion(packageJson.version, argv._[0] as string);
  logger.success(`Created new version: ${chalk.cyan(incrementedVersion)}`);
  logger.info(`Updating package.json version...`);
  await setPackageVersion(incrementedVersion);
  logger.success(`Updated package.json version: ${chalk.cyan(incrementedVersion)}`);

  // deploy
  await git.add([path.join(__dirname, '..')]);
  await git.commit(`[release] Version: ${incrementedVersion}`);
  await git.push();

  open(
    githubRelease({
      user: 'dttctcs',
      repo: 'seidrui',
      tag: incrementedVersion,
      title: incrementedVersion,
    }),
  );
})();
