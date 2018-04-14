import express from "express";
// import { User } from "../mongodb";
import main from "./main";
// import users from "./users";
import sign from "./sign";

import * as tools from "../../utils/tools";
import { trim, isEmail } from "validator";

var router = express.Router();
router.get('/', main.index);
router.get('/signup', sign.signup);
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

});

module.exports = router;