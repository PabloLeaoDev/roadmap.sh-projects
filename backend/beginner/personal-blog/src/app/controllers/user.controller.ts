import * as userService from '../services/user.service.ts';
import * as guessService from '../services/guess.service.ts';
import { Request, Response } from 'express';
import { IPost, IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';
import { error } from 'node:console';
// import { resPattern } from '../utils/main.util.ts';

// import { IError } from '../utils/interfaces/user.interface.ts';

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie('token');
    return res.redirect('/');
  } catch (error) {
    return res.status(400).render('fragments/_alert', {
      error: (error as Error).message,
      success: null
    });
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

    res.render('fragments/_post-row', { post: { ...post, author: users[0].name } });
  } catch (error) {
    return res.status(400).render('fragments/_alert', {
      error: (error as Error).message,
      success: null
    });
  }
}

export async function editPost(req: Request, res: Response) {
  try {
    const fields = req.body as IPostNoDate;

    if (!fields.id || isNaN(fields.id))
      throw new Error('ID post must be submitted');
    
    if (
         (!fields.title)
      && (!fields.content)
      && (!fields.summary) 
      && (!fields.authorId)
      && (!fields.category)
    ) throw new Error('At least one post upgradeable field must be submitted');

    const { post } = await userService.updatePostData({
      ...fields,
      id: Number(fields.id),
      authorId: Number(fields.authorId)
    });

    return res.render('fragments/_post-row', { post });
  } catch (error) {
    return res.status(400).render('fragments/_alert', {
      error: (error as Error).message,
      success: null
    });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    let { id } = req.params;

    if ((!id) || isNaN(Number(id)))
      throw new Error('ID post must be submitted');

    await userService.deletePost(Number(id));

    return res.status(200).render('fragments/_alert', {
      error: null,
      success: 'The post was successfully deleted'
    });
  } catch (error) {
    return res.status(400).render('fragments/_alert', {
      error: (error as Error).message,
      success: null
    });
  }
}

export function renderDashboard(req: Request, res: Response) {
  const user = req.user;

  return res.renderLayout({
    page: 'dashboard',
    styles: ['index', 'dashboard'],
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

export async function renderNewPostForm(req: Request, res: Response) {
  try {
    const { posts } = await userService.getPosts();

    return res.render('partials/_new-post-form', { posts, user: req.user });
  } catch (error) {
    return res.status(400).render('fragments/_alert', {
      error: (error as Error).message,
      success: null
    });
  }
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
