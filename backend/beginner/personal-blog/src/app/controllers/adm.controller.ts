import { Request, Response } from 'express';
import * as admService from '../services/adm.service';

export function renderLogin(req: Request, res: Response) {
  res.render('login');

  return {
    success: true,
    message: 'login rendered',
    payload: null
  };
}

export function renderEditArticlePainel(req: Request, res: Response) {
  const id = req.params.id;

  res.render('edit-article', { id });

  return {
    success: true,
    message: 'edit-article rendered',
    payload: { id }
  };
}

export async function renderAdmPainel(req: Request, res: Response) {
  try {
    const isVerified = await admService.verifyAdmData(req.body);

    if (!isVerified) throw new Error('Data admin isn\'t verified');

    const { error, payload } = await admService.getArticles();

    if (error) throw new Error();

    res.render('adm-painel', { articles: payload, success: true });

    return {
    success: true,
    message: 'adm-painel rendered',
    payload
  };
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function editArticle(req: Request, res: Response) {
  try {
    const { error, payload } = await admService.updateArticleData(Number(req.params.id), req.body);

    if (error) throw new Error();

    return res.status(200).send({
      success: true,
      message: 'Article edited successfully',
      payload
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
    const { error, payload } = await admService.createArticle(req.body);

    if (error) throw new Error();

    return res.status(200).send({
      success: true,
      message: 'Article created successfully',
      payload
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function deleteArticle(req: Request, res: Response) {
  try {
    const { error, payload } = await admService.deleteArticle(Number(req.params.id));

    if (error) throw new Error();

    return res.status(200).send({
      success: true,
      message: 'Article created successfully',
      payload
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}