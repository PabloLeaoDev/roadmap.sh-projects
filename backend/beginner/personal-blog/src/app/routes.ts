import { Router } from 'express';
import { authMid } from './middlewares/authMid.ts';
import * as guessController from './controllers/guess.controller.ts';
import * as userController from './controllers/user.controller.ts';

const router = Router();

// Guess
router.get('/', guessController.renderGotoHome);
router.get('/home', guessController.renderHome);
router.get('/post/:id', guessController.renderPost);

// Adm
router.get('/login/admin', userController.renderLogin);
router.get('/login/singup', userController.renderSigup);
router.get('/admin/edit/:id', authMid, userController.renderEditPostPainel);
router.get('/admin', authMid, userController.renderAdmPainel);
// router.post('/admin/signup', admController.signup);
router.post('/admin/signin', userController.signin);
router.post('/admin/edit/:id', authMid, userController.editPost);
router.post('/admin/new', authMid, userController.createPost);
router.post('/admin/delete/:id', authMid, userController.deletePost);

export default router;