import * as guessModel from '../models/guess.model';

export async function getArticles() {
  const { articles, error } = await guessModel.getArticles();

  return { articles, error };
}

export async function getArticle(id: number) {
  const { article, error } = await guessModel.getArticle(id);

  return { article, error };
}