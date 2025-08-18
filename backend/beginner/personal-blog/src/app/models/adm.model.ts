import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import IAdmin, { TAdminKeys } from "../utils/interfaces/admin.interface";
import { IError } from '../utils/interfaces/response.interface';
import IArticle, { IFlexibleArticleFields } from '../utils/interfaces/article.interface';
import { createDataBase, getCurrentDateFormat } from '../utils/main.util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPathAdmin = resolve(__dirname, '..', '..', '..', 'db', 'admin.json');
export const dbPathArticles = resolve(__dirname, '..', '..', '..', 'db', 'articles.json');

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
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message
    };
  }
}

export async function updateArticleData(id: number, fields: IFlexibleArticleFields): Promise<IError<IArticle>> {
  try {
    if (!id) throw new Error('ID article must be submitted');
    if ((!fields.title) && (!fields.body)) throw new Error('At least one article upgradeable field must be submitted');

    const articles: IArticle[] = JSON.parse(await fs.readFile(dbPathArticles, 'utf-8'));
    let article: IArticle | null = null;

    for (let atc of articles) {
      if (atc.id === id) {
        if (fields.title) atc.title = fields.title;
        if (fields.body) atc.body = fields.body;

        atc.updated_at = getCurrentDateFormat();
      }
    }

    await createDataBase(JSON.stringify(articles), dbPathArticles);

    return {
      error: '',
      payload: article
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function createArticle(fields: IFlexibleArticleFields): Promise<IError<IArticle>> {
  try {
    if ((!fields.title) || (!fields.body)) throw new Error('Both fields of the article must be submitted');

    if (!existsSync(dbPathArticles))
      await createDataBase('[]', dbPathArticles);

    const articles: IArticle[] = JSON.parse(await fs.readFile(dbPathArticles, 'utf-8'));
    const id = (() => {
      if (!articles.length) return 1;
        
      return articles[articles.length - 1].id + 1;
    })();

    const newArticle = { id, title: fields.title, body: fields.body, created_at: getCurrentDateFormat(), updated_at: null };

    articles.push(newArticle);

    await createDataBase(JSON.stringify(articles), dbPathArticles);

    return {
      error: '',
      payload: newArticle
    }
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function deleteArticle(id: number): Promise<IError<IArticle>> {
  try {
    if (!id) throw new Error('ID article must be submitted');

    const articles: IArticle[] = JSON.parse(await fs.readFile(dbPathArticles, 'utf-8'));
    let article: IArticle | null = null;

    for (let idx in articles) {
      if (articles[idx].id === id)
        articles.splice(Number(idx), 1);
    }

    await createDataBase(JSON.stringify(articles), dbPathArticles);

    return {
      error: '',
      payload: article
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}