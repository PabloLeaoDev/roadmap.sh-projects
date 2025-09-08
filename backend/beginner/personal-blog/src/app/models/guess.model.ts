import { existsSync, promises as fs } from 'fs';
import { IError } from '../utils/interfaces/response.interface';
import IArticle from '../utils/interfaces/article.interface';
import { dbPathArticles } from './adm.model';
import { createDataBase } from '../utils/main.util';

export async function getArticles(id?: number): Promise<{ articles: IArticle[] | IArticle }> {
  let articles: IArticle[];

  if (!existsSync(dbPathArticles)) {
    await createDataBase('[]', dbPathArticles);

    throw new Error('No articles in database');
  }

  articles = JSON.parse(await fs.readFile(dbPathArticles, 'utf-8'));

  if (articles.length === 0) throw new Error('No articles in database');

  if (!id && (articles.length >= 1)) return { articles };
  else if (!id && !articles.length) throw new Error('There is no article');

  return { articles: articles.filter((article) => article.id === id) };
}