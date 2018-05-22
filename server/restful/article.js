import * as Article from '../proxy/article';
import { formatDate } from '../../utils/tools';
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
            res.json(result);
        }).catch(err => {
            res.json(err)
        })
    },

    loadArticles: (req: Request, res: Response, next: NextFunction) => {
        let { author_id, articleNumber } = req.query;
        Article.getArticlesByAuthorId(author_id, articleNumber).then(result => {
            let number = parseInt(articleNumber) + result.length
            res.json(Object.assign({}, { articles: result }, { number }));
        }).catch(err => {
            res.json(err)
        })
    },

    updateArticle: (req: Request, res: Response, next: NextFunction) => {
        let article = req.body;
        let { article_id, maintext, title, figure } = article
        // Article.updateArtileByAritcleid(article_id, maintext, title, figure).then(result => {
        //     res.json(result)
        // }).catch(err => {
        //     res.json(err)
        // })
        Article.updateArtileByAritcleid(article_id, maintext, title, figure, (err, doc, result) => {
            if (err) res.json(err);
            if (doc) res.json(doc);
        })
    },

    createArticle: (req: Request, res: Response, next: NextFunction) => {
        let date = new Date();
        date = formatDate(date);
        let articleInfo = {
            maintext: '<p><br></p>',
            author_id: req.body.author_id,
            title: date
        }
        Article.newAndSave(articleInfo).then(result => {
            let opts = {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: false
            };
            res.cookie('ARTICLE_EDIT', result.article_id, opts);
            res.json({ article_id: result.article_id });
        }).catch(err => {
            res.json(err)
        })
    }
}

export default ArticleApi