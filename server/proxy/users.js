import { User } from "../mongodb";
import { v4 } from "uuid";
import utility from "utility";
import { Promise } from "mongoose";

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
export function getUserByid(id, callback) {
  User.findOne({ _id: id }, callback);
}

/**
 * 根据用户名称，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} name 用户名称
 * @param {Function} callback 回调函数
 */
export function getUserByName(name, callback) {
  const promise = new Promise((resolve, reject) => {
    User.findOne({loginname:name}, (err, res) => {
      if (err)
        reject(err);
      if (res)
        resolve(res);
    });
  })
  return promise;
}

/**
 * 根据关键字，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
export function getUsersByQuery(query, opt, callback) {
  User.find(query, '', opt, callback);
}

export function newAndSave(username, loginname, passhash, email, avatar_url, active) {
  let user = new User();
  user.name = username;
  user.loginname = loginname;
  user.password = passhash;
  user.email = email;
  user.avatar = avatar_url;
  user.active = active || false;
  user.accessToken = v4();
  console.log(username, passhash, email, avatar_url, user);
  return user.save();
}

export function makerAvatarUrl(email) {
  return 'http://www.gravatar.com/avatar/' + utility.md5(email.toLowerCase()) + '?size=48';
}