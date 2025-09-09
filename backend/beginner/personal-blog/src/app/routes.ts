import { Router } from 'express';
import { authMid } from './middlewares/authMid';
import * as guessController from './controllers/guess.controller';
import * as admController from './controllers/adm.controller';

const router = Router();

// Guess
router.get('/', guessController.renderGotoHome);
router.get('/home', guessController.renderHome);
router.get('/article/:id', guessController.renderArticle);

// Adm
router.get('/login/admin', admController.renderLogin);
router.get('/admin/edit/:id', authMid, admController.renderEditArticlePainel);
// router.post('/admin/signup', admController.signup);
router.post('/admin/signin', admController.signin);
router.post('/admin', authMid, admController.renderAdmPainel);
router.post('/admin/edit/:id', authMid, admController.editArticle);
router.post('/admin/new', authMid, admController.createArticle);
router.post('/admin/delete/:id', authMid, admController.deleteArticle);

export default router;