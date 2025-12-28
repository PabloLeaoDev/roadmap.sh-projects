import * as guessService from '../services/guess.service.ts'; 
import { Request, Response } from 'express';
import { IPost } from '../utils/interfaces/post.interface.ts';
import { resPattern } from '../utils/main.util.ts';

export async function renderHome(req: Request, res: Response) {
  try {
    if (req.url === '/') 
      return res.redirect('/home');

    const { posts } = await guessService.getPosts() as { posts: IPost[] };

    return res.render('home', { posts, user: 'teste', category: 'Tecnologia' });
  } catch (error) {
    const response = resPattern({ error: error as Error });
    return res.status(404).send(response);
  }
}

export async function renderPost(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { posts } = await guessService.getPosts(id) as { posts: IPost[] };

    if (!posts) throw new Error();

    return res.render('post', { article: posts[0] || posts, user: 'teste' });
  } catch (error) {
    const response = resPattern({ error: error as Error });
    return res.status(404).send(response);
  }
}