import { Router } from 'express';
import article from './article';
import auth from './auth';
import images from './images';
import comment from './comment';

const api = Router();

api.get('/', (req, res, next) => {

})

// load
api.get('/article',  article.loadArticle);
api.get('/titles', article.loadTitles);
api.get('/articles', article.loadArticles);
api.get('/auth', auth.userSignin);
api.get('/comment', comment.loadComments);

// update
api.put('/article', article.updateArticle);

// create
api.post('/article', article.createArticle);
api.post('/comment', comment.createComment);
api.post('/auth', auth.userSignUp);
api.post('/images', images.createImages);
api.post('/urlimage', images.createUrlImage);

export default api;