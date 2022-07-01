import chalk from 'chalk';
import { Logger } from './Logger';

const logger = new Logger('increment-version');

const VERSION_INCREMENT: string[] = ['patch', 'minor', 'major'];

export function getIncrementedVersion(version: string, type: string): string {
  if (!VERSION_INCREMENT.includes(type)) {
    logger.error(
      `Incorrect version type: ${chalk.cyan(type)}, it should be one of these values: ${VERSION_INCREMENT.join(', ')}`,
    );

    process.exit(1);
  }

  const updateVersion = (raw: string): string => {
    const splitted = raw.split('.');

    if (type === 'patch') {
      splitted[2] = (parseInt(splitted[2], 10) + 1).toString();
    }

    if (type === 'minor') {
      splitted[1] = (parseInt(splitted[1], 10) + 1).toString();
      splitted[2] = '0';
    }

    if (type === 'major') {
      splitted[0] = (parseInt(splitted[0], 10) + 1).toString();
      splitted[1] = '0';
      splitted[2] = '0';
    }

    return splitted.join('.');
  };

  try {
    return updateVersion(version);
  } catch (e) {
    logger.error('Failed to parse core package.json');
    process.exit(1);
    return null;
  }
}
