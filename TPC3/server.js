var http = require("http");
var fs = require("fs");
var url = require("url");
var axios = require("axios");

var atores = {}
var atoresToId = {}
var idToAtores = {}
var generos = {}
var generosToId = {}
var idToGeneros = {}

http.createServer((req, res) => {

    var q = url.parse(req.url, true);

    if (q.pathname == "/") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<h1>Escolhe uma opção</h1>");
        res.write("<ul>");
        res.write("<li><a href=http://localhost:7777/filmes>Filmes</a></li>");
        res.write("<li><a href=http://localhost:7777/atores>Atores</a></li>");
        res.write("<li><a href=http://localhost:7777/generos>Generos</a></li>");
        res.write("</ul>");
    }
    else if (q.pathname == "/filmes") {
        axios.get("http://localhost:3000/filmes")
            .then(resp => {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.write("<ul>");
                for (i in resp.data) {
                    res.write('<li><a href=http://localhost:7777/filmes/'+ resp.data[i]._id.$oid + '>' + resp.data[i].title + '</a></li>');
                }
                res.write("</ul>");
                res.end();
            })
            .catch(err => {
                res.write("Erro: " + err);
                res.end();
            });
    }else if (q.pathname.match(/\/filmes\/(.+)/)){
        let id = q.pathname.substring(8);
        axios.get("http://localhost:3000/filmes?_id.$oid=" + id)
            .then(resp => {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.write("<h2><b>" + resp.data[0].title + "</b></h2>");
                res.write("<p><b>Year: </b>" + resp.data[0].year + "</p>");
                res.write("<p><b>Cast: </b>" + resp.data[0].cast + "</p>");
                res.write("<p><b>Genres: </b>" + resp.data[0].genres + "</p>");
                res.end();
            })
            .catch(err => {
                res.write("Erro: " + err);
                res.end();
            });
    }else if (q.pathname == "/atores") {
        axios.get("http://localhost:3000/filmes")
            .then(resp => {
                var v = 0;
                if(Object.keys(atores).length === 0){
                    let lista = resp.data

                    let moviesSet = new Set();
    
                    for(elem in lista){
                        var castF = lista[elem].cast
                        for(c in castF){
                            if(castF[c] in atores){
                                atores[castF[c]] += "; " + lista[elem].title;
                            }
                            else{
                                atores[castF[c]] = lista[elem].title;
                                atoresToId[castF[c]] = v;
                                idToAtores[v] = castF[c];
                                v++;
                            }
                        }
                    }
                }
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.write("<ul>");
                for(i in atores){
                    res.write('<li><a href=http://localhost:7777/atores/'+ atoresToId[i] + '>' + i + '</a></li>');
                }
                res.write("</ul>");
                res.end();
            })
            .catch(err => {
                res.write("Erro: " + err);
                res.end();
            });
        } else if (q.pathname.match(/\/atores\/(.+)/)){
            let id = q.pathname.substring(8);
            var nome = idToAtores[id];
            var filmes = atores[nome];
            var filmesArray = filmes.split(';');
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write("<h2><b>" + nome + "</b></h2>");
            res.write("<p><b>Filmes: </b></p>");
            res.write("<ul>");
            for(i in filmesArray){
                res.write('<li>' + filmesArray[i] + '</li>');
            }
            res.write("</ul>");
            res.end();
        } else if(q.pathname == "/generos"){
            axios.get("http://localhost:3000/filmes")
            .then(resp => {
                var v = 0;
                if(Object.keys(generos).length === 0){
                    let lista = resp.data
    
                    for(elem in lista){
                        var genresF = lista[elem].genres
                        for(c in genresF){
                            if(genresF[c] in generos){
                                generos[genresF[c]] += "; " + lista[elem].title;
                            }
                            else{
                                generos[genresF[c]] = lista[elem].title;
                                generosToId[genresF[c]] = v;
                                idToGeneros[v] = genresF[c];
                                v++;
                            }
                        }
                    }
                }
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.write("<ul>");
                for(i in generos){
                    res.write('<li><a href=http://localhost:7777/generos/'+ generosToId[i] + '>' + i + '</a></li>');
                }
                res.write("</ul>");
                res.end();
            })
            .catch(err => {
                res.write("Erro: " + err);
                res.end();
            });
        } else if(q.pathname.match(/\/generos\/(.+)/)){
            let id = q.pathname.substring(9);
            var nome = idToGeneros[id];
            var filmes = generos[nome];
            var filmesArray = filmes.split(';');
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write("<h2><b>" + nome + "</b></h2>");
            res.write("<p><b>Filmes: </b></p>");
            res.write("<ul>");
            for(i in filmesArray){
                res.write('<li>' + filmesArray[i] + '</li>');
            }
            res.write("</ul>");
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write("<p>Pagina nao encontrada</p>");
            res.end();
        }
}).listen(7777);

console.log("Servidor disponível em http://localhost:7777/");
