import * as guessController from './controllers/guess.controller.ts';
import * as userController from './controllers/user.controller.ts';
import { Router } from 'express';
import { verifyAuthMid } from './middlewares/auth.middleware.ts';

const router = Router();

// Guess Routes
router.get('/', guessController.renderHome);
router.get('/home', guessController.renderHome);
router.get('/post/:id', guessController.renderPost);
router.get('/login', userController.renderLogin);
router.get('/singup', userController.renderSigup);

// User Routes
router.get('/home/admin', verifyAuthMid, userController.renderDashboard);
router.get('/logout', verifyAuthMid, userController.logout);
// router.get('/admin/post/edit/:id', verifyAuthMid, userController.renderEditPostPainel);
router.post('/admin/signup', userController.signup);
router.post('/admin/signin', userController.signin);
router.post('/admin/post/edit/:id', verifyAuthMid, userController.editPost);
router.post('/admin/post/new', verifyAuthMid, userController.createPost);
router.delete('/admin/post/delete/:id', verifyAuthMid, userController.deletePost);

export default router;
