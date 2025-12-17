import { Request, Response } from 'express';
import * as guessService from '../services/guess.service.ts';
import { Post  } from '../../generated/prisma/client.ts';
import { IError } from '../utils/interfaces/response.interface.ts';

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
    const { posts } = await guessService.getPosts() as { posts: Post[] };

    res.render('home', { posts, user: 'teste', category: 'Tecnologia' });

    return {
      success: true,
      message: 'home rendered',
      payload: posts
    };
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function renderPost(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { posts } = await guessService.getPosts(id) as { posts: Post[] };

    if (!posts) throw new Error();

    res.render('article', { article: posts[0] || posts, user: 'teste' });

    return {
      success: true,
      message: 'article rendered',
      payload: posts
    };
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}