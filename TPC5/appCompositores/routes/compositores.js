var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET compositores listing. */
router.get('/compositores', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/compositores?_sort=nome')
    .then(resp => {
      var compositores = resp.data;
      res.status(200).render("compositoresListPage", {"lCompositores": compositores, "date": d});
    })
    .catch(erro => {
      res.status(501).render('error', {"error": erro})
    })
});

router.get('/add', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  res.status(200).render("compositoresAddPage", {"date": d});
});

router.post('/add', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  var result = req.body;
  axios.post('http://localhost:3000/compositores', result)
    .then(resp => {
      res.status(200).redirect('/compositores');
    })
    .catch(erro => {
      res.status(502).render('error', {"error": erro})
    })
});

router.get("/:id", function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  var id = req.params.id
  axios.get('http://localhost:3000/compositores/'+id)
  .then(response => {
      var compositor = response.data
      res.status(200).render("compositorPage", {title: "Compositor", "compositor": compositor, "date": d })
  })
  .catch(function(erro){
    res.status(504).render("error", { "error": erro })
  })
});

router.get("/edit/:id", function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  var id = req.params.id
  axios.get('http://localhost:3000/compositores/'+id)
  .then(response => {
      var compositor = response.data
      res.status(200).render("compositorEditPage", {title: "Compositor", "compositor": compositor, "date": d })
  })
  .catch(function(erro){
    res.status(504).render("error", { "error": erro })
  })
});

router.post("/edit/:id", function(req, res, next) {
  var compositor = req.body
  axios.put('http://localhost:3000/compositores/'+req.params.id, compositor)
    .then(resp => {
      res.status(201).redirect('/compositores')
  })
  .catch(erro => {
    res.status(506).render("error", { "error": erro })
  })
});

router.get("/delete/:id", function(req, res, next) {
  axios.delete('http://localhost:3000/compositores/'+req.params.id)
    .then(resp => {
      res.status(200).redirect('/compositores')
    })
    .catch(erro => {
      res.status(507).render("error", { "error": erro })
    })
})

module.exports = router;
