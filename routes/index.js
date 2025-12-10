var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET admin layout. */
router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Express', layout: 'layout-admin' });
});

/**  Ruta del login - get login page */
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

/**  Ruta del post */
router.post('/login', function(req, res, next) {
  if (req.body.name==="admin" && req.body.password==="admin") {
    req.redirect("/admin");
  } else {
    res.render('login', {});
  }
  
});

module.exports = router;
