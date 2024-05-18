var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/web', function(req, res, next) {
  res.render('userside/dashboard');
});
router.get('/uheader', function(req, res, next) {
  res.render('userside/uheader');
});

module.exports = router;
