import express from "express";
import { User } from "../server/mongodb";
var router = express.Router();

/* GET home page. */
exports.index = function (req, res, next) {
  res.render('signup', { title: 'Jacobi\'s Blog' });
}
