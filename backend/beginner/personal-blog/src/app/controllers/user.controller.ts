import * as userService from '../services/user.service.ts';
import * as guessService from '../services/guess.service.ts';
import { Request, Response } from 'express';
import { IPost, IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';
import { resPattern, mainViewData } from '../utils/main.util.ts';

// import { IError } from '../utils/interfaces/user.interface.ts';

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie('token');
    return res.redirect('/');
  } catch (error) {
    const response = resPattern({ error: error as Error });

    return res.status(400).json(response);
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const { title, authorId, content, summary, category, tags } = req.body as IPostCreate;

    if (
         (!title)
      || (!content)
      || (!summary) 
      || (!authorId)
      || (!category)
    ) throw new Error('All obligatory fields of the post must be submitted');

    const { post } = await userService.createPost({ title, authorId: Number(authorId), content, summary, category, tags });
    const { users } = await userService.getUsersById(Number(authorId));

    const response = resPattern({ 
      success: true, 
      message: 'Post created successfully', 
      payload: { post } 
    });

    res.render('fragments/_post-row', { post: { ...post, author: users[0].name } });
  } catch (error) {
    res.status(400).render('fragments/_alert', {
      error: (error as Error).message,
      success: null
    });
  }
}

export async function editPost(req: Request, res: Response) {
  try {
    const { id, ...fields } = { id: Number(req.params.id), ...req.body } as IPostNoDate;

    if (!id || isNaN(id))
      throw new Error('ID post must be submitted');
    
    if (
         (!fields.title)
      && (!fields.content)
      && (!fields.summary) 
      && (!fields.authorId)
      && (!fields.category)
    ) throw new Error('At least one post upgradeable field must be submitted');

    const { post } = await userService.updatePostData({
      id,
      ...fields,
      authorId: Number(fields.authorId)
    });
    const response = resPattern({ 
      success: true, 
      message: 'Post edited successfully', 
      payload: { post } 
    });

    return res.status(200).json(response);
  } catch (error) {
    const response = resPattern({ error: error as Error });

    return res.status(400).json(response);
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    let { id } = req.params;

    if ((!id) || isNaN(Number(id)))
      throw new Error('ID post must be submitted');

    const { post } = await userService.deletePost(Number(id));
    const response = resPattern({ 
      success: true, 
      message: 'Post deleted successfully', 
      payload: { post } 
    });

    return res.json(response);
  } catch (error) {
    const response = resPattern({ error: error as Error });

    return res.status(400).json(response);
  }
}

export function renderDashboard(req: Request, res: Response) {
  const user = req.user;

  return res.render('layouts/index', {
    ...mainViewData,
    page: 'dashboard',
    styles: ['dashboard'],
    data: { success: true, user }
  });
}
export async function renderDashboardPartial(req: Request, res: Response) {
  try {
    const { posts } = await userService.getPosts();

    return res.render('partials/_dashboard-partial', { posts, user: req.user });
  } catch (error) {
    return res.status(400).render('fragments/_alert', {
      error: (error as Error).message,
      success: null
    });
  }
};

export function renderNewPostForm(req: Request, res: Response) {
    res.render('partials/_new-post-form', { user: req.user });
};

export async function renderEditPostForm(req: Request, res: Response) {
  try {
    const { posts } = await guessService.getPosts(Number(req.params.id));
    
    return res.render('partials/_edit-post-form', { post: (posts as IPost[])[0], user: req.user });
  } catch (error) {
    return res.status(400).render('fragments/_alert', {
      error: (error as Error).message,
      success: null
    });
  }
};
