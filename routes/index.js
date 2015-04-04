var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/home', function(req, res) {
  res.render('partials/home');
});
router.get('/about', function(req, res) {
  res.render('partials/about');
});
router.get('/contact', function(req, res) {
  res.render('partials/contact');
});
router.get('/blog', function(req, res) {
  res.render('partials/blog');
});
module.exports = router;
