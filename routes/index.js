var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // should be redirected to catalog later:
  // res.redirect('/catalog');
});

module.exports = router;
