const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

/* GET periodos listing. */
router.get('/periodos', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/periodos?_sort=nome')
    .then(resp => {
      var periodos = resp.data;
      res.status(200).render("periodosListPage", {"lPeriodos": periodos, "date": d});
    })
    .catch(erro => {
      res.status(501).render('error', {"error": erro})
    })
})

router.get('/add', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  res.status(200).render("periodosAddPage", {"date": d});
})

router.post('/add', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  var result = req.body;
  axios.post('http://localhost:3000/periodos', result)
    .then(resp => {
      res.status(200).redirect('/periodos');
    })
    .catch(erro => {
      res.status(502).render('error', {"error": erro})
    })
})

router.get('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/periodos/' + req.params.id)
    .then(resp => {
      var periodo = resp.data;
      res.status(200).render("periodosEditPage", {"periodo": periodo, "date": d});
    })
    .catch(erro => {
      res.status(503).render('error', {"error": erro})
    })
})

router.post('/edit/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.put('http://localhost:3000/periodos/' + req.params.id, req.body)
    .then(resp => {
      res.status(200).redirect('/periodos');
    })
    .catch(erro => {
      res.status(504).render('error', {"error": erro})
    })
})

router.get("/:id", function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  var id = req.params.id
  axios.get('http://localhost:3000/compositores')
  .then(response => {
    var compositores = response.data
      axios.get('http://localhost:3000/periodos/'+id)
      .then(response => {
        var periodo = response.data
        res.status(200).render("periodoPage", {title: "Período", "periodo": periodo, "compositores": compositores, "date": d })
      })
      .catch(function(erro){
        res.status(504).render("error", { "error": erro })
      })
  })
  .catch(function(erro){
    res.status(505).render("error", { "error": erro })
  })
});

router.get('/delete/:id', function(req, res, next) {
  axios.delete('http://localhost:3000/periodos/' + req.params.id)
    .then(resp => {
      res.status(200).redirect('/periodos');
    })
    .catch(erro => {
      res.status(506).render('error', {"error": erro})
    })
})

module.exports = router;
