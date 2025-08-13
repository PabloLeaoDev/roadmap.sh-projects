import * as guessModel from '../models/guess.model';
import IArticle from '../utils/interfaces/article.interface';
import { IError } from '../utils/interfaces/response.interface';

export async function getArticles(id?: number): Promise<IError<IArticle>> {
  try {
    if (id && isNaN(id)) throw new Error();

    const { payload, error } = (id) ? await guessModel.getArticles(id) : await guessModel.getArticles();

    if (error) throw new Error();

    return {
      payload,
      error: null
    }
  } catch (error) {
    return {
      error: (error as Error).message
    }
  }
}