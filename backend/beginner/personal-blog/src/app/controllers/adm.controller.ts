import { Request, Response } from 'express';
import * as admService from '../services/adm.service';

// export async function signup(req: Request, res: Response) {
//   try {
//     const { user, email, password } = req.body;
//     const { token } = await admService.signup({ user, email, password });

//     res.json({ token });

//     return res.status(200).send({
//       success: true,
//       message: '',
//       payload: null
//     });
//   } catch (error) {
//     return res.status(400).send({
//       success: false,
//       message: (error as Error).message,
//       payload: null
//     });
//   }
// }

export function renderResgister(req: Request, res: Response) {
  res.render('register');

  return {
    success: true,
    message: 'register rendered',
    payload: null
  };
}

export function renderLogin(req: Request, res: Response) {
  res.render('login');

  return {
    success: true,
    message: 'login rendered',
    payload: null
  };
}

export async function signin(req: Request, res: Response) {
  try {
    const { user, email, password } = req.body;
    const { token } = await admService.signin({ user, email, password });

    res.json({ token });

    return res.status(200).send({
      success: true,
      message: 'adm logged',
      payload: null
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: (error as Error).message,
      payload: null
    });
  }
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
    // const isVerified = await admService.verifyAdmData(req.body);

    // if (!isVerified) throw new Error('Data admin isn\'t verified');

    const { articles } = await admService.getArticles();

    res.render('adm-painel', { articles, success: true });

    return {
    success: true,
    message: 'adm-painel rendered',
    payload: articles
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
    const { article } = await admService.updateArticleData(Number(req.params.id), req.body);

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
    const { article } = await admService.createArticle(req.body);

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

export async function deleteArticle(req: Request, res: Response) {
  try {
    const { article } = await admService.deleteArticle(Number(req.params.id));

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