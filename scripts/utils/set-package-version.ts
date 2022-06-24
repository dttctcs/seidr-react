import path from 'path';
import fs from 'fs-extra';

export async function setPackageVersion(version: string) {
  const packageJsonPath = path.join(__dirname, '../../package.json');

  const current = await fs.readJSON(packageJsonPath);
  current.version = version;

  await fs.writeJSON(packageJsonPath, current, { spaces: 2 });
}
