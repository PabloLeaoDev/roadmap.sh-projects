import IAdmin from "../utils/interfaces/admin.interface";
import IArticle from "../utils/interfaces/article.interface";
import { IError } from "../utils/interfaces/response.interface";
import * as admModel from '../models/adm.model';
import { getArticles as gerGetArticles } from "../models/guess.model";

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
    const { error, payload } = await gerGetArticles();

    if (error) throw new Error();

    return {
      error: null,
      payload
    }
  } catch (error) {
    return {
      error: (error as Error).message
    }
  }
}

export async function updateArticleData(data: IArticle): Promise<IError<IArticle>> {
  try {
    if ((!data.id) || isNaN(data.id)) throw new Error();

    const { error, payload } = await admModel.updateArticleData(data.id, { title: data.title, body: data.body });
    
    if (error) throw new Error();
    if (!payload) throw new Error();

    return {
      error: null,
      payload
    }
  } catch (error) {
    return {
      error: (error as Error).message
    }
  }
}

export async function createArticle(data: IArticle): Promise<IError<IArticle>> {
  try {
    const { error, payload } = await admModel.createArticle(data);

    if (error) throw new Error();

    return {
      error: null,
      payload
    }
  } catch (error) {
    return {
      error: (error as Error).message
    }
  }
}