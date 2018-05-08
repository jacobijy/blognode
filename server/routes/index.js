import * as article from './article';
import * as main from './main';
import * as users from './users';
import { Router } from "express";
import { join } from "path";

/* GET home page. */
const router = Router();
router.get('/', main.index);

router.get('/*', (req, res, next) => {
  res.sendFile(join(__dirname, '../../views/index.html'));
})

// Article
router.post('/editor', article.onOpenEditor);
router.post('/upload_image', article.uploadImage);
router.post('/save_article', article.saveArticle);
router.post('/new_article', article.newArticle);
router.post('/api/articles', article.getArticleList);

//User
router.post('/api/signin', users.userSignin);
router.post('/api/signup', users.userSignUp);

export { router as router}