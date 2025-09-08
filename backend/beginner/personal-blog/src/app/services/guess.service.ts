import * as guessModel from '../models/guess.model';
import IArticle from '../utils/interfaces/article.interface';
import { IError } from '../utils/interfaces/response.interface';

export async function getArticles(id?: number): Promise<{ articles: IArticle[] | IArticle }> {
  if (id && isNaN(id)) throw new Error('Invalid User ID');

  const { articles } = (id) ? await guessModel.getArticles(id) : await guessModel.getArticles();

  return { articles };
}