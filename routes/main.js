import { User } from "../server/mongodb";

/* GET home page. */
exports.index = (req, res, next) => {
  res.render('index', { title: 'Jacobi\'s Blog' });
}