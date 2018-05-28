import { Request, Response, NextFunction } from 'express';
import * as Comments from '../../proxy/comment';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { anonymous, comment, article_id } = req.body;
    try {
        let commentResult = await Comments.newAndSave(article_id, anonymous, comment);
        res.json(commentResult)
    } catch (err) {
        res.json({ err })
    }

}

const loadComments = async (req: Request, res: Response, next: NextFunction) => {
    const article_id = req.query.article_id;
    try {
        const commets = await Comments.getCommentsByArticleId(article_id)
        res.json(commets)
    } catch (err) {
        res.json({ err })
    }
}

const comment = { createComment, loadComments }

export default comment