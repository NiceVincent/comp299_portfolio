var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page', pageName: 'home' });
});

/* GET About me page. */
router.get('/about-me', function(req, res, next) {
  res.render('index', { title: 'About me', pageName: 'aboutMe'});
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects', pageName: 'projects'});
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services', pageName: 'services'});
});

/* GET Contact me page. */
router.get('/contact-me', function(req, res, next) {
  res.render('index', { title: 'Contact me', pageName: 'contact'});
});


module.exports = router;
