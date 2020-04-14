var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Get users Cool message:
router.get('/cool', function(req, res) {
  res.send('You are cool user!');
});
module.exports = router;
