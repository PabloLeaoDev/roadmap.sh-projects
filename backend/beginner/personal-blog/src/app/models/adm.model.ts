import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import IAdmin, { TAdminKeys } from "../utils/interfaces/admin.interface";
import { IError } from '../utils/interfaces/response.interface';
import IArticle from '../utils/interfaces/article.interface';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPathAdmin = resolve(__dirname, '..', '..', '..', 'db', 'admin.json');
const dbPathArticles = resolve(__dirname, '..', '..', '..', 'db', 'articles.json');

export async function compareWithVerifiedAdm(admData: IAdmin): Promise<{ error: boolean, message: string }> {
  try {
    const validAdmin = { user: 'test', email: 'test@hardcoded.com', password: 'isHardCodeAGoodPractice123' };

    if ((!admData.user) || (!admData.email) || (!admData.password)) throw new Error();

    await createDataBase(JSON.stringify([ validAdmin ]), dbPathAdmin);

    for (let [ key ] of Object.entries(validAdmin))
      if (admData[key as TAdminKeys] !== validAdmin[key as TAdminKeys]) throw new Error();

    return {
      error: false,
      message: ''
    }
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    }
  }
}

export async function getArticles(id?: number): Promise<IError<IArticle>> {
  try {
    const isWindows = process.platform === 'win32', 
          separator = isWindows ? '\\' : '/',
          cleanPath = path.split(separator);

    if (cleanPath[cleanPath.length - 1].includes('.')) cleanPath.pop(); // remove file

    if (!existsSync(cleanPath.join(separator))) 
      await fs.mkdir(cleanPath.join(separator), { recursive: true });

    await createDataBase('[]', dbPathArticles);
  } catch (error) {
    
  }
}

export async function updateArticleData() {}
export async function createArticle() {}