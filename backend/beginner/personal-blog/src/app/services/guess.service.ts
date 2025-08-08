import * as guessModel from '../models/guess.model';
import IArticle from '../utils/interfaces/article.interface';
import { IError } from '../utils/interfaces/response.interface';

export async function getArticles(): Promise<IError<IArticle>> {
  try {
    const { articles, error } = await guessModel.getArticles();
    
    return {
      error: null,
      payload: articles
    }
  } catch (error) {
    return {
      error: (error as Error).message
    }
  }
}

export async function getArticle(id: number): Promise<IError<IArticle>> {
  const { articles, error } = await guessModel.getArticle(id);

  return { articles, error };
}