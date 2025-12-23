import * as guessService from '../services/guess.service.ts'; 
import { Request, Response } from 'express';
import { IPost } from '../utils/interfaces/post.interface.ts';

export async function renderHome(req: Request, res: Response) {
  try {
    if (req.url === '/') 
      return res.redirect('/home');

    const { posts } = await guessService.getPosts() as { posts: IPost[] };

    res.render('home', { posts, user: 'teste', category: 'Tecnologia' });

    return {
      success: true,
      message: 'Home page was rendered',
      payload: { posts }
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
    const { posts } = await guessService.getPosts(id) as { posts: IPost[] };

    if (!posts) throw new Error();

    res.render('post', { article: posts[0] || posts, user: 'teste' });

    return {
      success: true,
      message: 'Post page was rendered',
      payload: { posts }
    };
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}