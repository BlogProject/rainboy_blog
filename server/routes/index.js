var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status:0,
    message:'rainboy blog backend server 1.0'
  })
});

module.exports = router;
