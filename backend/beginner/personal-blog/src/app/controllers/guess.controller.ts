import { Request, Response } from 'express';
import * as guessService from '../services/guess.service';
import * as guessView from '../views/guess.view';
import IResponse from '../../interfaces/response.interface';
import IArticle from '../../interfaces/article.interface';

export async function renderHome(req: Request, res: Response): Promise<IResponse<IArticle>> {
  try {
    const articles = await guessService.getArticles();
    res.send(guessView.renderHome(articles));

    return {
      success: true,
      message: 'Articles load successfully',
      payload: articles
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message
    }
  }
}

export async function renderArticle(req: Request, res: Response): Promise<IResponse<IArticle>> {
  try {
    const article = await guessService.getArticle(req.params.id);
    res.send(guessView.renderArticle(article));

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