import { existsSync, promises as fs } from 'fs';
import { IError } from '../interfaces/response.interface';

export default async function createPath(path: string): Promise<IError<Buffer<ArrayBufferLike>>> {
  try {
    // const isWindows = process.platform === 'win32', 
    //       separator = isWindows ? '\\' : '/',
    //       cleanPath = path.split(separator);

    // let pathFile = '';

    // if (cleanPath[cleanPath.length - 1].includes('.')) pathFile = cleanPath.pop() as string; // remove file

    // const dinamicPath = cleanPath.join(separator);

    if (!existsSync(path)) 
      await fs.mkdir(path, { recursive: true });

    console.log('The path has been created!');
    
    const dataFile = await fs.readFile(path);

    return { error: '', payload: dataFile };
  } catch (error) {
    return { error: (error as Error).message };
  }
}