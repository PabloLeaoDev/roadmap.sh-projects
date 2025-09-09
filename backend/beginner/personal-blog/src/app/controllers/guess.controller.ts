import { Request, Response } from 'express';
import * as guessService from '../services/guess.service';
import IArticle from '../utils/interfaces/article.interface';

export async function renderGotoHome(req: Request, res: Response) {
  try {
    renderHome(req, res);

    return {
      success: true,
      message: 'go to home rendered'
    };
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function renderHome(req: Request, res: Response) {
  try {
    const { articles } = await guessService.getArticles() as { articles: IArticle[] };

    if (!articles.length) throw new Error();

    res.render('home', { articles, user: 'teste', category: 'Tecnologia' });

    return {
      success: true,
      message: 'home rendered',
      payload: articles
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
    const { articles } = await guessService.getArticles(id) as { articles: IArticle[] };

    if (!articles) throw new Error();

    res.render('article', { article: articles[0] || articles, user: 'teste' });

    return {
      success: true,
      message: 'article rendered',
      payload: articles
    };
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}