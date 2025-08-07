import { Request, Response } from 'express';
import * as admService from '../services/adm.service';
import IResponse from '../interfaces/response.interface';
import IArticle from '../interfaces/article.interface';

export function renderLogin(req: Request, res: Response) {
  try {
    res.render('login');

    return res.status(200).send({
      success: true,
      message: 'Admin login screen was rendered'
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export function renderEditArticlePainel(req: Request, res: Response) {
  try {
    return res.status(200).send({
      success: true,
      message: 'Admin login screen was rendered'
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function renderAdmPainel(req: Request, res: Response) {
  try {
    const { isVerified } = await admService.verifyAdmData(req.body);

    if (!isVerified) throw new Error('Data isn\'t verified');

    const { articles, error } = await admService.getArticles();

    if (error) throw new Error();

    res.render('adm-painel', { articles });

    return res.status(200).send({
      success: true,
      message: 'Admin painel was rendered',
      payload: articles
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function editArticle(req: Request, res: Response) {
  try {
    const { article, error } = await admService.updateArticleData(req.params.id);

    if (error) throw new Error();

    return res.status(200).send({
      success: true,
      message: 'Article edited successfully',
      payload: article
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function createArticle(req: Request, res: Response) {
  try {
    const { article, error } = await admService.createArticle();

    if (error) throw new Error();

    return res.status(200).send({
      success: true,
      message: 'Article created successfully',
      payload: article
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}
