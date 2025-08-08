import { promises as fs } from 'fs';
import { IError } from '../utils/interfaces/response.interface';

export async function getArticles(): Promise<IError> {
  const data = await fs.readFile('articles.json', 'utf-8');
  return { articles: JSON.parse(data), error: null };
}

export async function getArticle(id: number): Promise<IError> {
  const data = await fs.readFile('articles.json', 'utf-8');
  return { articles: JSON.parse(data), error: null };
}