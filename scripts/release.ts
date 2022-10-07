import path from 'path';
import chalk from 'chalk';
import simpleGit from 'simple-git';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { setPackageVersion } from './utils/set-package-version';

import { Logger } from './utils/Logger';

const logger = new Logger('build');
const git = simpleGit();

const { argv }: { argv: any } = yargs(hideBin(process.argv)).option('tag', {
  type: 'string',
  default: 'latest',
  description: 'Tag',
});

(async () => {
  // increment version
  logger.info(`Creating new version...`);
  const version = argv._[0];
  logger.success(`Created new version: ${chalk.cyan(version)}`);
  logger.info(`Updating package.json version...`);
  await setPackageVersion(version);
  logger.success(`Updated package.json version: ${chalk.cyan(version)}`);

  await git.add([path.join(__dirname, '..')]);
  await git.commit(`[release] Version: ${version}`);
  await git.push();

  // open(
  //   githubRelease({
  //     user: 'dttctcs',
  //     repo: 'seidr-react',
  //     tag: incrementedVersion,
  //     title: incrementedVersion,
  //   }),
  // );
})();
