import { promises as fs } from 'fs';

export default async function createPath(path: string): Promise<void> {
  try {
    const isWindows = process.platform === 'win32', 
          separator = isWindows ? '\\' : '/',
          cleanPath = path.split(separator);

    if (cleanPath[cleanPath.length - 1].includes('.')) cleanPath.pop(); // remove file

    await fs.mkdir(cleanPath.join(separator), { recursive: true });

    console.log('The path has been created!');
  } catch (err) {
    console.error(err);
  }
}