import express from "express";
import { User } from "../server/mongodb";
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  
  res.render('index', { title: 'Jacobi\'s Blog' });
});

module.exports = router;
