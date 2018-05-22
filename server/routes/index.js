import * as main from './main';
import * as users from './users';
import api from '../restful';
import { Router } from "express";
import { join } from "path";

/* GET home page. */
const router = Router();
router.get('/', main.index);
router.get('/api', api);

router.get('/*', (req, res, next) => {
  res.sendFile(join(__dirname, '../../views/index.html'));
})

//User
router.post('/api/signin', users.userSignin);
router.post('/api/signup', users.userSignUp);

export { router as router}