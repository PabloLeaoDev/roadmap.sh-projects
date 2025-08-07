import { app } from './app';
import * as guessController from './controllers/guess.controller';
import * as admController from './controllers/adm.controller';

const router = app.router;

// Guess
router.get('home', guessController.renderHome);
router.get('article/:id', guessController.renderArticle);

// Adm
router.get('login/admin', admController.renderLogin);
router.get('/edit/:id', admController.renderEditArticlePainel);
router.post('/admin', admController.renderAdmPainel);
router.post('/edit/:id', admController.editArticle);
router.post('/new', admController.createArticle);

export default router;