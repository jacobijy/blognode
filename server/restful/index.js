import { Router } from 'express';
import article from './article';

const api = Router();

api.get('/', (req, res, next) => {

})

// load
api.get('/article',  article.loadArticle)
api.get('/titles', article.loadTitles)
api.get('/articles', article.loadArticles)

// update
api.put('/article', article.updateArticle)

// create
api.post('/article', article.createArticle)

export default api;