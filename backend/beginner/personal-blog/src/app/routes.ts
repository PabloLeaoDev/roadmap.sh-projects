import * as guessController from './controllers/guess.controller.ts';
import * as userController from './controllers/user.controller.ts';
import { Router } from 'express';
import { verifyAuthMid } from './middlewares/auth.middleware.ts';

const router = Router();

// GET (Guess Routes)
router.get('/', guessController.renderHome);
router.get('/home', guessController.renderHome);
router.get('/home/load-more', guessController.loadMoreArticles);
// router.get('/post/:id', guessController.renderPost);
// router.get('/post/:id', guessController.renderPostPartial);
router.get('/login', guessController.renderLogin);
router.get('/login/partial', guessController.renderLoginPartial);
router.get('/signup', guessController.renderSignup);
router.get('/signup/partial', guessController.renderSignupPartial);

// GET (User Routes)
router.get('/dashboard', verifyAuthMid, userController.renderDashboard);
router.get('/logout', verifyAuthMid, userController.logout);
router.get('/admin/dashboard/partial', verifyAuthMid, userController.renderDashboardPartial);
router.get('/admin/post/new-form', verifyAuthMid, userController.renderNewPostForm);
router.get('/admin/post/edit-form/:id', verifyAuthMid, userController.renderEditPostForm);

// POST (Guess Routes)
router.post('/signup', guessController.signup);
router.post('/signin', guessController.signin);

// POST (User Routes)
router.post('/admin/post/new', verifyAuthMid, userController.createPost);

// PATCH (User Routes)
router.patch('/admin/post/edit/:id', verifyAuthMid, userController.editPost);

// DELETE (User Routes)
router.delete('/admin/post/delete/:id', verifyAuthMid, userController.deletePost);

export default router;
