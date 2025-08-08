import { Request, Response } from 'express';
import * as admService from '../services/adm.service';

export function renderLogin(req: Request, res: Response) {
  res.render('login');

  return res.status(200).send({
    success: true,
    message: 'Admin login screen was rendered'
  });
}

export function renderEditArticlePainel(req: Request, res: Response) {
  res.render('edit-article', { id: req.params.id });
  
  return res.status(200).send({
    success: true,
    message: 'Admin login screen was rendered'
  });
}

export async function renderAdmPainel(req: Request, res: Response) {
  try {
    const isVerified = await admService.verifyAdmData(req.body);

    if (!isVerified) throw new Error('Data admin isn\'t verified');

    const { error, payload } = await admService.getArticles();

    if (error) throw new Error();

    res.render('adm-painel', { articles: payload });

    return res.status(200).send({
      success: true,
      message: 'Admin painel was rendered',
      payload
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
    const { error, payload } = await admService.updateArticleData(req.body);

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
