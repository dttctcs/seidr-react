import open from 'open';
import path from 'path';
import chalk from 'chalk';
import simpleGit from 'simple-git';
import githubRelease from 'new-github-release-url';

import { buildPackage } from './build';
import { Logger } from './utils/Logger';
import packageJson from '../package.json';

const logger = new Logger('build');
const git = simpleGit();

(async () => {
  const status = await git.status();

  if (status.files.length !== 0) {
    logger.error('Working tree is not clean');
    process.exit(1);
  }

  // increment version
  logger.info('Release initiated');

  let incrementedVersion = getIncrementedVersion(packageJson.version, argv._[0] as string);
  let build = buildPackage();

  // await git.add([path.join(__dirname, '../src'), path.join(__dirname, '../package.json')]);
  // await git.commit(`[release] Version: ${incrementedVersion}`);
  // await git.push();

  // open(
  //   githubRelease({
  //     user: 'mantinedev',
  //     repo: 'mantine',
  //     tag: incrementedVersion,
  //     title: incrementedVersion,
  //   }),
  // );
})();
