import * as Article from '../proxy/article';

const article = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query.article_id);
    
}

const queryTitles = (req: Request, res: Response, next: NextFunction) => {
    let author_id = req.query.author_id
    Article.getTitlesByAuthorId(author_id).then(result => {
        console.log(result);
        res.json(result);
    }).catch(err => {
        console.log(err);
    })
}

const saveArticle = (req: Request, res: Response, next: NextFunction) => {
    let article = req.body;
    let { article_id, maintext, title, figure } = article
    Article.updateArtileByAritcleid(article_id, maintext, title, figure, (err, doc, result) => {
        res.json(doc)
    })
}

export { article, queryTitles, saveArticle }