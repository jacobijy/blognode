import { Article } from "../mongodb";
import { Types } from "mongoose";
import { config } from '../../config'

/**
 * 根据ID查找文章
 * Callback:
 * - err, 数据库异常
 * - article, 文章
 * @param {Number} id ID
 * @param {Function} callback 回调函数
 */
export function getArtileByid(id, callback) {
    Article.findOne({ _id: id }, callback);
}

/**
 * 根据文章ID查找文章
 * Callback:
 * - err, 数据库异常
 * - article, 文章
 * @param {Number} article_id 文章ID
 * @param {Function} callback 回调函数
 */
export function getArtileByArticleid(article_id) {
    return Article.findOne({ article_id: article_id }).exec();
}

/**
 * 根据文章ID更新文章
 * Callback:
 * - err, 异常
 * - article, 文章
 * @param {Number} article_id 文章id
 * @param {String} maintext 正文
 * @param {string} title 文章标题
 * @param {Array} images 插入图片
 * @param {Function} callback 回调函数
 */
export function updateArtileByAritcleid(article_id, maintext, title, images, callback) {
    // callback
    let option = { maintext, title }
    if ('function' == typeof images) {
        callback = images;
    }
    else {
        option = Object.assign({}, option, { figure: images })
    }
    console.log(option);
    Article.findOneAndUpdate({ article_id: article_id }, { $set: option }, callback);
}

/**
 * 根据用户名称查找文章id列表
 * @param {ObjectId} author_id 用户id
 * @param {Function} callback 回调
 */

export function getArticlesByAuthorId(author_id, number) {
    const query = Article.find({ author_id }, { article_id: 1, title: 1, maintext: 1, figure: 1, _id: 0 }); // `query` is an instance of `Query`
    query
        .sort({ article_id: -1 })
        .limit(config.articleNumberLoadOnce)
        .skip(parseInt(number))
    return query.exec();
}

/**
 * 根据作者id查找文章id title列表
 * @param {ObjectId} author_id 用户id
 */

export function getTitlesByAuthorId(author_id) {
    const query = Article.find({ author_id }, { article_id: 1, title: 1, _id: 0 })
    query.sort({ article_id: -1 })
    return query.exec()
}

/**
 * example as article info
 * id: auto
 * article_id: audo-increment
 * author_id: ObjectId
 * figure: []//image names
 * maintext: ''//innerhtml
 * postdate: Date, default: Date.now
 * readtime: Number
 * commitsnumber: Number
 * likedtime: Number
 * @param {Object} articleinfo
 * @param {function} callback
 */

export function newAndSave(articleinfo) {
    let article = new Article();
    article.author_id = Types.ObjectId(articleinfo.author_id);
    article.figure = [];
    article.maintext = articleinfo.maintext;
    article.title = articleinfo.title;
    return article.save();
}