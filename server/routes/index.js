import express, { Router } from "express";
import { User } from "../mongodb";
import main from "./main";
import users from "./users";
import sign from "./sign";

var router = Router();
router.get('/', main.index);
router.get('/signup', sign.signup)
router.post('/signup', (req, res, next) => {
  console.log('get post')
})

module.exports = router;