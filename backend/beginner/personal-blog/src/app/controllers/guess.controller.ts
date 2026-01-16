import * as guessService from '../services/guess.service.ts';
import * as userService from '../services/user.service.ts';
import { Request, Response } from 'express';
import { IPost } from '../utils/interfaces/post.interface.ts';
import { IUserBase, IUserCreate } from '../utils/interfaces/user.interface.ts';
import { Permission } from '../utils/enums/perm.enum.ts';
import { userInputValidation, generateToken, generateCookie, resPattern } from '../utils/main.util.ts';

export async function signup(req: Request, res: Response) {
  try {
    let { name, email, password, confirmPassword, permId } = req.body as IUserCreate & { confirmPassword: string };

    userInputValidation({ name, email, password, confirmPassword }, true);
  
    if (!permId) permId = Permission.ADMIN;

    const createdUser = await userService.signup({ name, email, password, permId }),
          token = generateToken(createdUser);

    generateCookie(res, token);

    if (!res.locals.layout) {
      res.set('HX-Redirect', '/login?success=Conta criada com sucesso!');
      return res.send();
    }

    res.redirect('/login?success=Conta criada com sucesso!');
  } catch (error) {
    if (!res.locals.layout) {
        return res.render('fragments/_alert', {
          error: (error as Error).message
        });
    }

    return res.renderLayout({
      page: 'sign',
      styles: ['index' ,'sign'],
      data: {
        isSignup: true, 
        error: error,
        success: null 
      }
    });
  }
}

export async function signin(req: Request, res: Response) {
  try {
    let { name, email, password, permId } = req.body as IUserBase;
    
    userInputValidation({ name, email, password });

    if (!permId) permId = Permission.ADMIN;

    const authorizedUser = await userService.signin({ name, email, password, permId }),
          token = generateToken(authorizedUser);

    generateCookie(res, token);

    if (!res.locals.layout) {
      res.set('HX-Redirect', '/dashboard');
      return res.send();
    }
    
    res.redirect('/dashboard');
  } catch (error) {
    if (!res.locals.layout) {
      return res.status(400).render('fragments/_alert', { 
          error: (error as Error).message 
      });
    }
    
    res.redirect(`/signup?error=${encodeURIComponent((error as Error).message)}`);
  }
}

export async function renderHome(req: Request, res: Response) {
  try {
    if (req.url === '/') 
      return res.redirect('/home');

    const { posts } = await guessService.getPosts() as { posts: IPost[] };
    const { search, category } = req.query;

    if (!res.locals.layout) {
      return res.render('partials/_posts-list', { 
        posts, 
        search, 
        category 
      });
    }

    return res.renderLayout({
      page: 'home',
      styles: ['index', 'home'],
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
  /*
  const { offset, search, category } = req.query;
  const posts = await guessService.getPosts({ 
      search, 
      category, 
      offset: parseInt(offset as string) 
  });
  
  let html = '';
  posts.forEach((post) => {
      html += res.render('partials/_article-card', { post }, (err, html) => html);
  });
  
  res.send(html);
  */
};

export async function renderPost(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { posts } = await guessService.getPosts(id) as { posts: IPost[] };

    if (!posts) throw new Error();

    return res.renderLayout({
      page: 'post',
      styles: ['index' ,'post'],
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

export function renderLogin(req: Request, res: Response) {
  return res.renderLayout({
    page: 'sign',
    styles: ['index' ,'sign'],
    data: {
      isSignup: false,
      name: req.query.name || '',
      error: req.query.error || null,
      success: req.query.success || null
    }
  });
}

export function renderLoginPartial(req: Request, res: Response) {
  if (!res.locals.layout) {
      return res.render('partials/_sign-partial', {
        isSignup: false,
        name: req.query.name || '',
        error: req.query.error || null,
        success: req.query.success || null
      });
  }

  return res.renderLayout({
    page: 'sign',
    data: {
      isSignup: false,
      name: req.query.name || '',
      error: req.query.error || null,
      success: req.query.success || null
    }
  });
};

export function renderSignup(req: Request, res: Response) {
  return res.renderLayout({
    page: 'sign',
    styles: ['index' ,'sign'],
    data: {
      isSignup: true
    }
  });
}

export function renderSignupPartial(req: Request, res: Response) {
    res.render('partials/_sign-partial', { 
        isSignup: true,
        error: req.query.error || null,
        success: req.query.success || null,
        name: req.query.name || '',
        email: req.query.email || ''
    });
};
