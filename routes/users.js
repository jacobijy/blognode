var express = require('express');
var router = express.Router();

/* GET users listing. */
exports.index = (req, res, next) => {
  res.send('respond with a resource');
};
