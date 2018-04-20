'use district'
import express from "express";
import main from "./main";
import sign from "./sign";
import * as tools from "../../utils/tools";
import { trim, isEmail } from "validator";
import { getUsersByQuery, newAndSave, makerAvatarUrl } from "../proxy/users";
import { User } from "../mongodb";
import { join } from "path";
import { readFile, writeFile, unlink } from "fs";
import { saveFileToDb, getFilebyName, getFilebyMd5 } from "../proxy/attachment";
import { config } from "../../config";
import { createHash } from "crypto";

const router = express.Router();
router.get('/', main.index);
router.get('/*', (req, res, next) => {
  res.sendFile(join(__dirname, '../../views/index.html'));
})

router.post('/signup', (req, res, next) => {
  const signuperror = function (msg) {
    res.status(422);
    res.send(msg);
  }

  let username = trim(req.body.username).toLowerCase();
  let password = trim(req.body.password);
  let passwordex = trim(req.body.passwordex);
  let email = trim(req.body.email).toLowerCase();
  console.log(username, password, passwordex, email);
  if ([username, password, passwordex, email].some((item) => { return item === ''; })) {
    return signuperror('信息不完整。');
  }
  if (username.length < 5) {
    return signuperror('用户名至少需要5个字符。');
  }
  if (!tools.validateId(username)) {
    return signuperror('用户名不合法。');
  }
  if (!isEmail(email)) {
    return signuperror('邮箱不合法。');
  }
  if (password !== passwordex) {
    return signuperror('两次密码输入不一致。');
  }

  let query = { "$or": [{ "username": username }, { "email": email }] };
  getUsersByQuery(query, {}, (err, users) => {
    if (err) {
      return signuperror('query err');
    }
    if (users.length > 0) {
      return signuperror('用户名或邮箱已被使用。');
    }

    tools.bhash(password, (err, passhash) => {
      if (err) {
        return next(err);
      }

      let avatarurl = makerAvatarUrl(email);
      newAndSave(username, username, passhash, email, avatarurl, false, (err, product) => {
        console.log(product);
        console.log(err);
        if (err) {
          return signuperror('save err')
        }
      })
    })
  })
});

router.post('/upload', function (req, res) {
  let files = req.files;
  let message = req.body;
  // console.log(req.files);  // 上传的文件信息
  var des_file = config.tmpFileDir + files[0].originalname;
  readFile(files[0].path, (err, data) => {
    console.log('readfile', data)
    let md5sum = createHash('md5').update(data);
    let md5 = md5sum.digest('hex').toLowerCase();
    writeFile(des_file, data, (err)=> {
      if (err) 
        throw err;
      unlink(files[0].path, (err) => {
        if (err)
          throw err;
      })
      let response = {
        filename: files[0].originalname,
        filepath: config.tmpFileDir,
        article_id: message.article_id
      }
      getFilebyMd5(md5, (err, attachment) => {
        if (attachment != null) {
          let tmpfile = config.tmpFileDir + req.files[0].filename;
          console.log(tmpfile)
          // unlink(tmpfile, (err) => {
          //   if (err)
          //     console.log(err);
          // })
          return;
        }
        saveFileToDb(response, (err, result) => {
          if (err) {
            res.send(err);
            return;
          }
          console.log(files[0].path)
          let srcpath = '/public/images/tmp/' + response.filename;
          // res.sendFile(join(__dirname, '../../views/index.html'))
          res.json({ path: srcpath });
        })
      })
    })
  })
});

module.exports = router;