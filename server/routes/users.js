import { Router } from "express";
import { trim, isEmail } from "validator";
import * as tools from "../../utils/tools";
import { getUsersByQuery, newAndSave, makerAvatarUrl } from "../proxy/users";
const router = Router();

function signuperror(msg, res) {
  res.status(422);
  res.send(msg);
}

function userSignUp(req, res, next) {

  let username = trim(req.body.username).toLowerCase();
  let password = trim(req.body.password);
  let passwordex = trim(req.body.passwordex);
  let email = trim(req.body.email).toLowerCase();
  console.log(username, password, passwordex, email);
  if ([username, password, passwordex, email].some((item) => { return item === ''; })) {
    return signuperror('信息不完整。', res);
  }
  if (username.length < 5) {
    return signuperror('用户名至少需要5个字符。', res);
  }
  if (!tools.validateId(username)) {
    return signuperror('用户名不合法。', res);
  }
  if (!isEmail(email)) {
    return signuperror('邮箱不合法。', res);
  }
  if (password !== passwordex) {
    return signuperror('两次密码输入不一致。', res);
  }

  let query = { "$or": [{ "username": username }, { "email": email }] };
  getUsersByQuery(query, {}, (err, users) => {
    if (err) {
      console.log(err);
      return;
    }
    if (users.length > 0) {
      return signuperror('用户名或邮箱已被使用。', res);
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
}

function userSignin(req, res, next) {
  let username = trim(req.body.username).toLowerCase();
  let password = trim(req.body.password);
  let query = { "$and": [{ "username": username }, { "password": password }] };
  getUsersByQuery(query, {}, (err, users) => {
    if (err) {
      console.log(err);
      return;
    }
    if (users.length <= 0) {
      return signuperror('用户名或密码错误', res);
    }
  })
}

export { userSignUp, userSignin }