import { Attachment } from "../mongodb";

/**
 * 根据图片名字，查找图片
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} filename 图片名称
 * @param {Function} callback 回调函数
 */
export function getFilebyName(filename, callback) {
  User.findOne({ filename: filename }, callback);
}

export function saveFileToDb(file, callback) {

}