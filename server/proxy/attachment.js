import { Attachment } from "../mongodb";
import mongoose from "mongoose";
import GridFs from "gridfs-stream";
import { config } from "../../config";
import { createReadStream, unlink } from "fs";

var connection = mongoose.connection;
GridFs.mongo = mongoose.mongo;

var gfs;
connection.once('open', () => {
  gfs = GridFs(connection.db)
})

/**
 * 根据图片名字，查找图片
 * Callback:
 * - err, 数据库异常
 * - filename, 图片名称
 * @param {String} filename 图片名称
 * @param {Function} callback 回调函数
 */
export function getFilebyName(filename, callback) {
  Attachment.findOne({ filename: filename }, callback);
}

/**
 * 根据Md5，查找图片
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} md5 md5
 * @param {Function} callback 回调函数
 */
export function getFilebyMd5(md5, callback) {
  Attachment.findOne({ md5: md5 }, callback);
}

export function saveFileToDb(fileinfo, callback) {
  const writestream = gfs.createWriteStream({
    filename: fileinfo.originalname
  })
  createReadStream(fileinfo.filepath + fileinfo.filename).pipe(writestream);
  writestream.on('close', (file) => {
    unlink(fileinfo.filepath + fileinfo.filename, (err) => {
      if (err) {
        return callback(err, null);
      };
      callback(null, file)
    });
  })
}