import express from "express";
import { User } from "../mongodb";
var router = express.Router();

exports.signup = (req, res, next) => {
  console.log('go to page signup');
}