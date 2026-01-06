import * as guessService from '../services/guess.service.ts'; 
import { Request, Response } from 'express';
import { IPost } from '../utils/interfaces/post.interface.ts';
import { resPattern, mainViewData } from '../utils/main.util.ts';

export async function renderHome(req: Request, res: Response) {
  try {
    if (req.url === '/') 
      return res.redirect('/home');

    const isHtmx = req.headers['hx-request'] === 'true';
    
    if (isHtmx) {
      return res.render('partials/_articles-list', { 
        posts, 
        search, 
        category 
      });
    }

    const { posts } = await guessService.getPosts() as { posts: IPost[] };

    return res.render('layouts/main', {
      ...mainViewData,
      page: 'home',
      styles: ['home'],
      data: {
        posts, 
        user: 'teste',
        category: 'Tecnologia'
      } 
    });
  } catch (error) {
    const response = resPattern({ error: error as Error });
    return res.status(404).send(response);
  }
}

export const loadMoreArticles = async (req: Request, res: Response) => {
    const { offset, search, category } = req.query;
    const posts = await getPosts({ 
        search, 
        category, 
        offset: parseInt(offset as string) 
    });
    
    let html = '';
    posts.forEach((post) => {
        html += res.render('partials/_article-card', { post }, (err, html) => html);
    });
    
    res.send(html);
};

export async function renderPost(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { posts } = await guessService.getPosts(id) as { posts: IPost[] };

    if (!posts) throw new Error();

    return res.render('layouts/main', {
      ...mainViewData,
      age: 'post',
      styles: ['post'],
      data: {
        article: posts[0] || posts,
        user: 'teste' 
      }
    });
  } catch (error) {
    const response = resPattern({ error: error as Error });
    return res.status(404).send(response);
  }
}