import * as Users from '../../proxy/users';
import { Request, Response, NextFunction } from 'express';
import { trim, isEmail } from 'validator';
import * as tools from '../../../utils/tools';
import { config } from '../../../config';

const signuperror = (msg, res: Response) => {
    res.status(203);
    res.send({ msg, err: true });
}

const UserApi = {
    userSignUp: (req: Request, res: Response, next: NextFunction) => {
        let username = trim(req.body.username).toLowerCase();
        let password = trim(req.body.password);
        let passwordex = trim(req.body.passwordex);
        let email = trim(req.body.email).toLowerCase();
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

        let query = { $or: [{ loginname: username }, { email }] };
        Users.getUsersByQuery(query, {}).then(result => {
            if (result.length > 0) {
                return signuperror('用户名或邮箱已被使用。', res);
            }

            tools.bhash(password, (err, passhash) => {
                if (err) {
                    return next(err);
                }

                let avatarurl = Users.makerAvatarUrl(email);
                Users.newAndSave(username, username, passhash, email, avatarurl, false).then(
                    (result) => {
                        res.send({ msg: 'success', result: true });
                    },
                    (error) => {
                        console.error(error);
                    })
            })
        }).catch(err => {
            if (err) {
                console.error(err);
                return;
            }
        })
    },

    userSignin: (req: Request, res: Response, next: NextFunction) => {
        let username = trim(req.query.name).toLowerCase();
        let password = trim(req.query.password);
        Users.getUserByName(username).then(function (json) {
            tools.bcompare(password, json.password, (err, result) => {
                if (err) throw err;
                if (result) {
                    let auth_token = json._id + '$$$$' + json.loginname; // 以后可能会存储更多信息，用 $$$$ 来分隔
                    let opts = {
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        httpOnly: false
                    };
                    console.log(auth_token)
                    res.cookie(config.auth_cookiename, auth_token, opts);
                    res.send({ result: true, msg: 'success' });
                    // res.redirect('/');
                }
                else {
                    return signuperror('用户名密码不匹配', res);
                }
            })
        }, function (error) {
            console.error(error);
        });
    }
}

export default UserApi