import express from "express";
import { User } from "../server/mongodb";
var router = express.Router();

exports.signup = function (req, res, next) {
  console.log('go to page signup')
  res.render("signup");
}