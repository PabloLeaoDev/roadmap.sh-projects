import { existsSync, promises as fs } from 'fs';
import IPostTable from '../utils/interfaces/post.interface.ts';
import { dbPathArticles } from './user.model.ts';
import { createDataBase } from '../utils/main.util.ts';

export async function getArticles(id?: number): Promise<{ articles: IPostTable[] | IPostTable }> {
  let articles: IPostTable[];

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