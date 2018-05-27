import { Attachment } from "../mongodb";
import mongoose from "mongoose";
import GridFs, { Grid } from "gridfs-stream";
import { createReadStream } from "fs";

const connection = mongoose.connection;
GridFs.mongo = mongoose.mongo;

let gfs: Grid;
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
export function getFilebyName(filename) {
  return Attachment.findOne({ filename }).exec();
}

/**
 * 根据Md5，查找图片
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} md5 md5
 * @param {Function} callback 回调函数
 */
export function getFilebyMd5(md5) {
  return Attachment.findOne({ md5 }).exec();
}

export function saveFileToDb(fileinfo) {
  const writestream = gfs.createWriteStream({
    filename: fileinfo.filename,
    article_id: parseInt(fileinfo.article_id)
  })
  createReadStream(fileinfo.tmpfile).pipe(writestream);
  return new Promise((resolve, reject) => {
    writestream.on('close', file => resolve(file));
    writestream.on('error', error => reject(error));
  });
}