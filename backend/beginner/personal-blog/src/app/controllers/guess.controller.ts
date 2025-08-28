import { Request, Response } from 'express';
import * as guessService from '../services/guess.service';
import IArticle from '../utils/interfaces/article.interface';

export async function renderHome(req: Request, res: Response) {
  try {
    const { error, payload } = await guessService.getArticles();

    if (error) throw new Error();

    res.render('home', { articles: payload, user: 'teste', category: 'Tecnologia' });

    return {
      success: true,
      message: 'home rendered',
      payload
    };
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function renderArticle(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { error, payload } = await guessService.getArticles(id);

    if (error) throw new Error();

    res.render('article', { article: (payload as IArticle[])[0] || payload, user: 'teste' });

    return {
      success: true,
      message: 'article rendered',
      payload
    };
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}