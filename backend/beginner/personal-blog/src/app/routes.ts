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
router.get('/admin/edit/:id', verifyAuthMid, userController.renderEditPostPainel);
router.get('/admin', verifyAuthMid, userController.renderAdmPainel);
router.post('/admin/signup', userController.signup);
router.post('/admin/signin', userController.signin);
router.post('/admin/edit/:id', verifyAuthMid, userController.editPost);
router.post('/admin/new', verifyAuthMid, userController.createPost);
router.post('/admin/delete/:id', verifyAuthMid, userController.deletePost);

export default router;