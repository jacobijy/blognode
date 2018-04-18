import express from "express";
import main from "./main";
// import users from "./users";
import sign from "./sign";
import * as tools from "../../utils/tools";
import { trim, isEmail } from "validator";
import { getUsersByQuery, newAndSave, makerAvatarUrl } from "../proxy/users";
import { User } from "../mongodb";
import { join } from "path";
import multer from "multer";

const upload = multer({ dest: 'images/' });
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

	console.log(req.body);
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

router.post('/upload', upload.single('article_image'), (req, res, next) => {
	console.log(req.files, req.file);
})

module.exports = router;