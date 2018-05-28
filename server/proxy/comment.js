import { Comment } from '../mongodb';
import { Document } from 'mongoose';

export function getCommentsByArticleId(article_id) {
    const query = Comment.find({ article_id })
    return query.exec()
}

export function newAndSave(article_id, name = 'anonymous', comment) {
    const comment_info:Document = new Comment()
    comment_info.article_id = article_id;
    comment_info.name = name;
    comment_info.comment = comment;
    return comment_info.save()
}