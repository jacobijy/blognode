import { Router } from 'express';
import article from './article';

const api = Router();

api.get('/', (req, res, next) => {

})

api.get('/article',  article.loadArticle)
api.get('/titles', article.loadTitles)

api.put('/article', article.saveArticle)

export default api;