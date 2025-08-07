import { promises as fs } from 'fs';
import IArticle from '../interfaces/article.interface';


export async function getArticles(): Promise<IArticle[]> {
  const data = await fs.readFile('articles.json', 'utf-8');
  return JSON.parse(data);
  
}