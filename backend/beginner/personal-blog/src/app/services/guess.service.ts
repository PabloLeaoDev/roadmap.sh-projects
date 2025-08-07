import * as guessModel from '../models/guess.model';

export async function getArticles() {
  return await guessModel.getArticles();
}

export async function getArticle(id: number) {
  return await guessModel.getArticle();
}