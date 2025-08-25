import { existsSync, promises as fs } from 'fs';
import { IError } from '../utils/interfaces/response.interface';
import IArticle from '../utils/interfaces/article.interface';
import { dbPathArticles } from './adm.model';
import { createDataBase } from '../utils/main.util';

export async function getArticles(id?: number): Promise<IError<IArticle>> {
  try {
    let articles: IArticle[];

    if (!existsSync(dbPathArticles)) {
      await createDataBase('[]', dbPathArticles);

      throw new Error('No articles in database');
    }

    articles = JSON.parse(await fs.readFile(dbPathArticles, 'utf-8'));

    if (articles.length === 0) throw new Error('No articles in database');

    if (!id) return { error: '', payload: articles };

    return {
      error: '',
      payload: articles.filter((article) => article.id === id)
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}