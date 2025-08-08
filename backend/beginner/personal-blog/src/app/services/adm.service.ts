import IAdmin from "../utils/interfaces/admin.interface";
import IArticle from "../utils/interfaces/article.interface";
import { IError } from "../utils/interfaces/response.interface";
import * as admModel from '../models/adm.model';

export async function verifyAdmData(admData: IAdmin): Promise<boolean> {
  try {
    if ((!admData.user) && (!admData.email)) throw new Error();
    if (!admData.password) throw new Error();

    const { error } = await admModel.compareWithVerifiedAdm(admData);

    if (error) throw new Error();

    return true;
  } catch (error) {
    return false;
  }
}

export async function getArticles(): Promise<IError<IArticle>> {
  try {
    const { articles, error } = await admModel.getArticles();

    if (error) throw new Error();

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

export async function updateArticleData(data: Partial<IArticle>): Promise<IError<IArticle>> {
  try {
    if ((!data.id) || isNaN(data.id)) throw new Error();

    const { articles, error } = await admModel.updateArticleData(data);
    
    if (error) throw new Error();

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

export async function createArticle(data: IArticle): Promise<IError<IArticle>> {
  try {
    const { articles, error } = await admModel.createArticle(data);

    if (error) throw new Error();

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