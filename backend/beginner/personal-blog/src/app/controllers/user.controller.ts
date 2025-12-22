import * as userService from '../services/user.service.ts';
import { Request, Response } from 'express';
import { IUserBase, IUserCreate } from '../utils/interfaces/user.interface.ts';
import { IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';
import { Permission } from '../utils/enums/perm.enum.ts';
import { userInputValidation } from '../utils/main.util.ts';

// import { IError } from '../utils/interfaces/user.interface.ts';

export async function signup(req: Request, res: Response) {
  try {
    let { user, email, password, confirmPassword, permId } = req.body as IUserCreate & { confirmPassword: string };

    userInputValidation({ user, email, password, confirmPassword }, true);
  
    if (!permId) permId = Permission.USER;

    const { token } = await userService.signup({ user, email, password, permId });

    res.json({ token });

    return res.status(200).send({
      success: true,
      message: '',
      payload: null
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: (error as Error).message,
      payload: null
    });
  }
}

export async function signin(req: Request, res: Response) {
  try {
    let { user, email, password, permId } = req.body as IUserBase;
    
    userInputValidation({ user, email, password });

    if (!permId) permId = Permission.USER;

    const { token } = await userService.signin({ user, email, password, permId });

    res.json({ token });

    return {
      success: true,
      message: 'adm logged',
      payload: null
    };
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: (error as Error).message,
      payload: null
    });
  }
}

export async function editPost(req: Request, res: Response) {
  try {
    const { id, ...fields } = { id: Number(req.params.id), ...req.body } as IPostNoDate;

    if (!id || isNaN(id))
      throw new Error('ID post must be submitted');
    
    if (
      (!fields.title) &&
      (!fields.content) &&
      (!fields.summary) && 
      (!fields.authorId) &&
      (!fields.category)
    ) throw new Error('At least one post upgradeable field must be submitted');

    const { post } = await userService.updatePostData({ id, ...fields });

    return res.status(200).send({
      success: true,
      message: 'Post edited successfully',
      payload: post
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const { title, authorId, content, summary, category, tags } = req.body as IPostCreate;

    if (
      (!title) ||
      (!content) ||
      (!summary) || 
      (!authorId) ||
      (!category)
    ) throw new Error('All obligatory fields of the post must be submitted');

    const { post } = await userService.createPost({ title, authorId, content, summary, category, tags });

    return res.status(200).send({
      success: true,
      message: 'Post created successfully',
      payload: post
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    let { id } = req.params;

    if ((!id) || isNaN(Number(id)))
      throw new Error('ID post must be submitted');

    const { post } = await userService.deletePost(Number(id));

    return res.status(200).send({
      success: true,
      message: 'Post created successfully',
      payload: post
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}

export function renderResgister(req: Request, res: Response) {
  res.render('register');

  return {
    success: true,
    message: 'register rendered',
    payload: null
  };
}

export function renderLogin(req: Request, res: Response) {
  res.render('login');

  return {
    success: true,
    message: 'login rendered',
    payload: null
  };
}

export function renderSigup(req: Request, res: Response) {
  res.render('signup');

  return {
    success: true,
    message: 'signup rendered',
    payload: null
  };
}

export function renderEditPostPainel(req: Request, res: Response) {
  const id = req.params.id;

  res.render('edit-post', { id });

  return {
    success: true,
    message: 'edit-post rendered',
    payload: { id }
  };
}

export async function renderAdmPainel(req: Request, res: Response) {
  try {
    // const isVerified = await userService.verifyAdmData(req.body);

    // if (!isVerified) throw new Error('Data admin isn\'t verified');

    const { posts } = await userService.getPosts();

    res.render('adm-painel', { posts, success: true });

    return {
    success: true,
    message: 'adm-painel rendered',
    payload: posts
  };
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: (error as Error).message
    });
  }
}
