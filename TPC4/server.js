var http = require("http");
var fs = require("fs");
var url = require("url");
var axios = require("axios");
var templates = require("./templatess");
var static = require("./static");

http.createServer(function (req, res) {
    var d = new Date().toISOString().substr(0, 16);
    console.log(req.method + " " + req.url);
    var parsedUrl = url.parse(req.url, true);

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET":
                if(req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(templates.mainPage(d));
                    res.end();
                }
                else if(req.url == "/compositores"){
                    axios.get('http://localhost:3000/compositores?_sort=nome')
                        .then(response => {
                            var composers = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.composersListPage(composers, d));
                            res.end();
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write('<p>Não foi possivel obter a lista de compositores...');
                            res.write('<p>'+erro+'</p>');
                            res.end();
                        })
                }
                else if(/\/compositores\/C[0-9]+$/.test(req.url)){
                    var idComp = req.url.split("/")[2];
                    axios.get('http://localhost:3000/compositores/'+idComp)
                        .then(response => {
                            var composer = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.composerPage(composer, d));
                            res.end();
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write('<p>Não foi possivel obter o compositor...');
                            res.write('<p>'+erro+'</p>');
                            res.end();
                        })
                }
                else if(req.url == "/periodos"){
                    axios.get('http://localhost:3000/periodos')
                        .then(response => {
                            var periods = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.periodsListPage(periods, d));
                            res.end();
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write('<p>Não foi possivel obter a lista de periodos...');
                            res.write('<p>'+erro+'</p>');
                            res.end();
                        })
                }
                else if(/\/periodos\/.+$/.test(req.url)){
                    console.log("ENTREI");
                    var idPeriod = req.url.split("/")[2];
                    console.log(idPeriod);
                    axios.get('http://localhost:3000/periodos/'+idPeriod)
                        .then(response => {
                            var period = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.periodPage(period, d));
                            res.end();
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write('<p>Não foi possivel obter o periodo...');
                            res.write('<p>'+erro+'</p>');
                            res.end();
                        })
                }
            }
    }   
}).listen(1902);

console.log('Servidor à escuta em http://localhost:1902/');