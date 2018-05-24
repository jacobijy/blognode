import { Router } from 'express';
import article from './article';
import auth from './auth';

const api = Router();

api.get('/', (req, res, next) => {

})

// load
api.get('/article',  article.loadArticle)
api.get('/titles', article.loadTitles)
api.get('/articles', article.loadArticles)
api.get('/auth', auth.userSignin)

// update
api.put('/article', article.updateArticle)

// create
api.post('/article', article.createArticle)
api.post('/auth', auth.userSignUp)

export default api;