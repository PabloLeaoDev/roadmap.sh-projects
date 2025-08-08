import { Request, Response } from 'express';
import * as guessService from '../services/guess.service';

export async function renderHome(req: Request, res: Response) {
  try {
    const { error, payload } = await guessService.getArticles();

    if (error) throw new Error();

    res.render('index', { articles: payload });

    return res.status(200).send({
      success: true,
      message: 'Articles were successfully rendered',
      payload
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function renderArticle(req: Request, res: Response) {
  try {
    const { error, payload } = await guessService.getArticle(Number(req.params.id));

    if (error) throw new Error();

    res.render('article', { articles: payload });

    return res.status(200).send({
      success: true,
      message: 'Article was successfully rendered',
      payload
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}