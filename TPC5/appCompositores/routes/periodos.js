var express = require('express');
var router = express.Router();

/* GET periodos listing. */
router.get('/periodos', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
