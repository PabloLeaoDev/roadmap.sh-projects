import * as guessController from './controllers/guess.controller.ts';
import * as userController from './controllers/user.controller.ts';
import { Router } from 'express';
import { verifyAuthMid } from './middlewares/auth.middleware.ts';

const router = Router();

// Guess Routes
router.get('/', guessController.renderHome);
router.get('/home', guessController.renderHome);
// router.get('/post/:id', guessController.renderPost);
// router.get('/post/:id', guessController.renderPostPartial);
router.get('/login', userController.renderLogin);
router.get('/signup', userController.renderSignup);
router.get('/home/load-more', guessController.loadMoreArticles);

// User Routes
router.get('/dashboard', verifyAuthMid, userController.renderDashboard);
router.get('/logout', verifyAuthMid, userController.logout);
router.get('/admin/dashboard/partial', verifyAuthMid, userController.renderDashboardPartial);
router.get('/admin/post/new-form', verifyAuthMid, userController.renderNewPostForm);
router.get('/admin/post/edit-form/:id', verifyAuthMid, userController.renderEditPostForm);
router.post('/admin/signup', userController.signup);
router.post('/admin/signin', userController.signin);
router.patch('/admin/post/edit/:id', verifyAuthMid, userController.editPost);
router.post('/admin/post/new', verifyAuthMid, userController.createPost);
router.delete('/admin/post/delete/:id', verifyAuthMid, userController.deletePost);

export default router;
