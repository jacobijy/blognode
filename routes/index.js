import express, { Router } from "express";
import { User } from "../server/mongodb";
import main from "./main";
import users from "./users";
import sign from "./sign";

var router = Router();
router.get('/', main.index);
router.get('/signup', sign.signup)

module.exports = router;