import * as userService from '../services/user.service.ts';
import { Request, Response } from 'express';
import { IUserBase, IUserCreate } from '../utils/interfaces/user.interface.ts';
import { IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';
import { Permission } from '../utils/enums/perm.enum.ts';
import { userInputValidation, generateToken, generateCookie, resPattern } from '../utils/main.util.ts';

// import { IError } from '../utils/interfaces/user.interface.ts';

export async function signup(req: Request, res: Response) {
  try {
    let { user, email, password, confirmPassword, permId } = req.body as IUserCreate & { confirmPassword: string };

    userInputValidation({ user, email, password, confirmPassword }, true);
  
    if (!permId) permId = Permission.GUESS;

    const createdUser = await userService.signup({ user, email, password, permId }),
          token = generateToken(createdUser);

    const response = resPattern({ success: true, message: 'User created successfully' });

    generateCookie(res, token);

    return res.status(201).json(response);
  } catch (error) {
    const response = resPattern({ error: error as Error });

    return res.status(400).json(response);
  }
}

export async function signin(req: Request, res: Response) {
  try {
    let { user, email, password, permId } = req.body as IUserBase;
    
    userInputValidation({ user, email, password });

    if (!permId) permId = Permission.GUESS;

    const authorizedUser = await userService.signin({ user, email, password, permId }),
          token = generateToken(authorizedUser);

    const response = resPattern({ success: true, message: 'User already logged' });

    generateCookie(res, token);

    return res.status(200).json(response);
  } catch (error) {
    const response = resPattern({ error: error as Error });

    return res.status(400).json(response);
  }
}

export async function login(req: Request, res: Response) {}

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

    const { post } = await userService.createPost({ title, authorId, content, summary, category, tags });
    const response = resPattern({ success: true, message: 'Post created successfully', payload: { post } });

    return res.status(200).json(response);
  } catch (error) {
    const response = resPattern({ error: error as Error });

    return res.status(400).json(response);
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

    const { post } = await userService.updatePostData({ id, ...fields });
    const response = resPattern({ success: true, message: 'Post edited successfully', payload: { post } });

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
    const response = resPattern({ success: true, message: 'Post deleted successfully', payload: { post } });

    return res.status(200).json(response);
  } catch (error) {
    const response = resPattern({ error: error as Error });

    return res.status(400).json(response);
  }
}

export function renderResgister(req: Request, res: Response) {
  return res.render('register');
}

export function renderLogin(req: Request, res: Response) {
  return res.render('login');
}

export function renderSigup(req: Request, res: Response) {
  return res.render('signup');
}

export function renderEditPostPainel(req: Request, res: Response) {
  const id = req.params.id;

  return res.render('edit-post', { id });
}

export async function renderAdmPainel(req: Request, res: Response) {
  try {
    // const isVerified = await userService.verifyAdmData(req.body);

    // if (!isVerified) throw new Error('Data admin isn\'t verified');

    const { posts } = await userService.getPosts();

    return res.render('adm-painel', { posts, success: true });
  } catch (error) {
    const response = resPattern({ error: error as Error });

    return res.status(404).json(response);
  }
}
