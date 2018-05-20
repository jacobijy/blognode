import { Router } from 'express';
import * as article from './article';

const api = Router();

api.get('/', (req, res, next) => {
    
})

api.get('/article',  article.article)
api.get('/titles', article.queryTitles)

api.put('/article', article.saveArticle)

export default api;