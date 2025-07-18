import { app } from './app';
import * as guessController from './controllers/guess.controller';
// import * as admController from './controllers/adm.controller';

const router = app.router;

router.get('home', guessController.renderHome);
router.get('article/:id', guessController.renderArticle);

// router.get('login/adm', admController.renderLogin);
// router.post('login/adm', admController.verifyAdm);
// router.get('/admin', admController.renderAdmPainel);
// router.post('/edit/:id', admController.editArticle);
// router.post('/new', admController.createArticle);

export default router;