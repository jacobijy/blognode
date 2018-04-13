import { User } from "../mongodb";

/* GET home page. */
exports.index = (req, res, next) => {
  res.render('index', { title: 'Jacobi\'s Blog' });
}