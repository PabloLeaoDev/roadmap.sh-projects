import * as guessController from './controllers/guess.controller.ts';
import * as userController from './controllers/user.controller.ts';
import { Router } from 'express';
import auth from './middlewares/auth.middleware.ts';

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
router.get('/dashboard', auth, userController.renderDashboard);
router.get('/logout', auth, userController.logout);
router.get('/admin/dashboard/partial', auth, userController.renderDashboardPartial);
router.get('/admin/post/new-form', auth, userController.renderNewPostForm);
router.get('/admin/post/edit-form/:id', auth, userController.renderEditPostForm);

// POST (Guess Routes)
router.post('/signup', guessController.signup);
router.post('/signin', guessController.signin);

// POST (User Routes)
router.post('/admin/post/new', auth, userController.createPost);

// PATCH (User Routes)
router.patch('/admin/post/edit/:id', auth, userController.editPost);

// DELETE (User Routes)
router.delete('/admin/post/delete/:id', auth, userController.deletePost);

export default router;
