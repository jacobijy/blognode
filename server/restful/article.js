import * as Article from '../proxy/article';
import { Request, Response, NextFunction } from 'express';

const ArticleApi = {
    loadArticle: (req: Request, res: Response, next: NextFunction) => {
        let article_id = req.query.article_id;
        Article.getArtileByArticleid(article_id).then((result) => {
            res.json(result)
        }).catch((err) => {
            res.send(err)
        });
    },

    loadTitles: (req: Request, res: Response, next: NextFunction) => {
        let author_id = req.query.author_id
        Article.getTitlesByAuthorId(author_id).then(result => {
            console.log(result);
            res.json(result);
        }).catch(err => {
            console.log(err);
        })
    },

    saveArticle: (req: Request, res: Response, next: NextFunction) => {
        let article = req.body;
        let { article_id, maintext, title, figure } = article
        Article.updateArtileByAritcleid(article_id, maintext, title, figure, (err, doc, result) => {
            res.json(doc)
        })
    }
}

export default ArticleApi