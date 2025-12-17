import { Request, Response } from 'express';
import * as userService from '../services/user.service.ts';
import { IError } from '../utils/interfaces/response.interface.ts';

export async function signup(req: Request, res: Response) {
  try {
    const { user, email, password } = req.body;
    const { token } = await userService.signup({ user, email, password });

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

export async function signin(req: Request, res: Response) {
  try {
    const { user, email, password } = req.body;
    const { token } = await userService.signin({ user, email, password });

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

export async function editPost(req: Request, res: Response) {
  try {
    const { post } = await userService.updatePostData(Number(req.params.id), req.body);

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
    const { post } = await userService.createPost(req.body);

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
    const { post } = await userService.deletePost(Number(req.params.id));

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