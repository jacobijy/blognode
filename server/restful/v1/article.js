import * as Article from '../../proxy/article';
import { formatDate } from '../../../utils/tools';
import { Request, Response, NextFunction } from 'express';

const ArticleApi = {
    loadArticle: async (req: Request, res: Response, next: NextFunction) => {
        let article_id = req.query.article_id;
        try {
            let result = await Article.getArtileByArticleid(article_id);
            res.json(result);
        } catch (err) {
            res.status(404).json(err);
        }
    },

    loadTitles: async (req: Request, res: Response, next: NextFunction) => {
        let author_id = req.query.author_id;
        try {
            let titles = await Article.getTitlesByAuthorId(author_id);
            console.log(titles, 'test');
            res.json({ titles })
        } catch (err) {
            res.status(404).json(err);
        }
    },

    loadArticles: async (req: Request, res: Response, next: NextFunction) => {
        let { author_id, articleNumber } = req.query;
        try {
            let articles = await Article.getArticlesByAuthorId(author_id, articleNumber);
            let number = parseInt(articleNumber) + articles.length;
            res.json(Object.assign({}, { articles }, { number }));
        } catch (err) {
            res.status(404).json(err);
        }
    },

    updateArticle: (req: Request, res: Response, next: NextFunction) => {
        let article = req.body;
        let { article_id, maintext, title, figure } = article;
        Article.updateArtileByAritcleid(article_id, maintext, title, figure, (err, doc, result) => {
            if (err) res.json(err);
            if (doc) res.json(doc);
        })
    },

    createArticle: async (req: Request, res: Response, next: NextFunction) => {
        let date = new Date();
        date = formatDate(date);
        let articleInfo = {
            maintext: '<p><br></p>',
            author_id: req.body.author_id,
            title: date
        }
        try {
            let article = await Article.newAndSave(articleInfo);
            let opts = {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: false
            };
            res.cookie('ARTICLE_EDIT', article.article_id, opts);
            res.json({ article_id: article.article_id });
        } catch (err) {
            res.json(err);
        }
    }
}

export default ArticleApi