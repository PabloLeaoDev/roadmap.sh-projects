import { promises as fs } from 'fs';
import createPath from './createPath';

export default async function createDataBase(dataPath: string, fileContent = '[]'): Promise<void> {
  try {
    await fs.writeFile(dataPath, fileContent);
  } catch (err) {
    console.log('Creating database...');

    await createPath(dataPath);
    await createDataBase(dataPath, fileContent);
  } finally {
    console.log('The file has been saved!')
  }
}