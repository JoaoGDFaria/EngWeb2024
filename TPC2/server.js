var axios = require('axios');var http = require('http');
var axios = require('axios');
var url = require('url');
var fs = require('fs');

http.createServer((req, res) => {
    console.log(req.method + ' ' + req.url);
    var q = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if(q.pathname == '/'){
        axios.get('http://localhost:3000/cidades').then( (resp) => {
            let lista = resp.data;
            res.write('<ul>');
            for(i in lista){
                res.write('<li><a href="http://localhost:1902/cidades/' + lista[i].id + '">' + lista[i].nome + '</a></li>');
            }
            res.write('</ul>');
        }

        ).catch(
            erro => {
                console.log('Erro: ' + erro);
            }
        )
    }else if(q.pathname.match(/\/cidades\/c\d+/)){
        let id = q.pathname.substring(9);
        console.log(id);
        axios.get('http://localhost:3000/cidades/' + id).then( (resp) => {
            var path = "Cities/" + id + ".html";
            fs.readFile(path, (erro, dados) => {
                res.write(dados);
                res.end();
                console.log(dados)
            });
        }).catch(
            erro => {
                console.log('Erro: ' + erro);
            }
        )
    }else{
        res.write('Operação não suportada');
    }
}).listen(1902);

console.log('Servidor à escuta em http://localhost:1902/');