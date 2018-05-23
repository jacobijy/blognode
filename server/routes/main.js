/* GET home page. */
export const index = (req, res, next) => {
  res.render('index', { title: 'Jacobi\'s Blog' });
}