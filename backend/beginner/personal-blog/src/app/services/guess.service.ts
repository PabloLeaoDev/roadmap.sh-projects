import * as guessModel from '../models/guess.model';

export async function getArticles() {
  return await guessModel.getArticles();
}