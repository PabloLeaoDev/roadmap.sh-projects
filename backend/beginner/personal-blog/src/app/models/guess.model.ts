import { promises as fs } from 'fs';
import IArticle from '../interfaces/article.interface';


export async function getArticles(): Promise<{ articles: IArticle[], error: Error | null }> {
  const data = await fs.readFile('articles.json', 'utf-8');
  return { articles: JSON.parse(data), error: null };
}

export async function getArticle(id: number): Promise<{ article: IArticle, error: Error | null }> {
  const data = await fs.readFile('articles.json', 'utf-8');
  return { article: JSON.parse(data), error: null };
}