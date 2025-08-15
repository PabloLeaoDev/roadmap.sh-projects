import { promises as fs } from 'fs';
import createPath from './createPath';

export default async function createDataBase(fileContent = '[]', dataPath: string): Promise<void> {
  try {
    await createPath(dataPath);
    await fs.writeFile(dataPath, fileContent);
  } catch (err) {
    console.log((err as Error).message);
    console.log('Creating database...');

    console.log(dataPath);
    await createPath(dataPath);
    await createDataBase(fileContent, dataPath);
  } finally {
    console.log('The file has been saved!')
  }
}