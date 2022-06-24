import path from 'path';
import fs from 'fs-extra';

export async function setPackageVersion(version: string) {
  const src = path.join(__dirname, '../../src');

  const current = await fs.readJSON(path.join(__dirname, '../../package.json'));
  current.version = version;

  await fs.writeJSON(filePath, current, { spaces: 2 });
}
