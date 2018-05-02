import { Article } from "../mongodb";
import { Types } from "mongoose";

/**
 * 根据ID，查找文章
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
 * 根据文章ID，查找文章
 * Callback:
 * - err, 数据库异常
 * - article, 文章
 * @param {Number} article_id 文章ID
 * @param {Function} callback 回调函数
 */
export function getArtileByArticleid(article_id, callback) {
  Article.findOne({ article_id: article_id }, callback);
}

/**
 * 根据文章ID，更新文章
 * Callback:
 * - err, 异常
 * - article, 文章
 * @param {Number} article_id 文章id
 * @param {Array} images 插入图片
 * @param {String} maintext 正文
 */
export function updateArtileByAritcleid(article_id, article, images, callback) {
  // callback
  let option = { article: article }
  if ('function' == typeof images) {
    callback = images;
  }
  else {
    option = { maintext: article, figure: images }
  }
  Article.findOneAndUpdate({ article_id: article_id }, { $set: option }, callback);
}

/**
 * 根据用户名称，查找文章id列表
 * @param {ObjectId} author_id 用户id
 * @param {Function} callback 回调
 */

export function getArticlesByAuthorId(author_id, callback) {
  console.log(author_id)
  const query = Article.find(); // `query` is an instance of `Query`
  query.setOptions({ article_id: 1, title: 1, _id: 0 });
  query.collection(Article.collection);
  query.sort({ article_id: -1 });
  query.where('author_id').equals(author_id).limit(6).exec(callback);
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

export function newAndSave(articleinfo, callback) {
  let article = new Article();
  article.author_id = Types.ObjectId(articleinfo.author_id);
  article.figure = [];
  article.maintext = articleinfo.maintext;
  article.save(callback);
}
