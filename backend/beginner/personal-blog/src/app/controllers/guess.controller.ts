import { Request, Response } from 'express';
import * as guessService from '../services/guess.service';
import IResponse from '../interfaces/response.interface';
import IArticle from '../interfaces/article.interface';

export async function renderHome(req: Request, res: Response) {
  try {
    const { articles, error } = await guessService.getArticles();

    if (error) throw new Error();

    res.render('index', { articles });

    return res.status(200).send({
      success: true,
      message: 'Articles load successfully',
      payload: articles
    }) 
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    })
  }
}

export async function renderArticle(req: Request, res: Response) {
  try {
    const { article, error } = await guessService.getArticle(Number(req.params.id));

    if (error) throw new Error();

    res.render('article', { article });

    return {
      success: true,
      message: 'Articles load successfully',
      payload: article
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message
    }
  }
}