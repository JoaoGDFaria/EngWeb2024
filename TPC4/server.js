var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templatesCompositor = require('./templatesCompositor')
var templatesPeriodo = require('./templatesPeriodo')
var static = require('./static.js')


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


// Server creation

var compositoresServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url)

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }

    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if(req.url == "/compositores"){
                    axios.get('http://localhost:3000/compositores')
                        .then(response => {
                            var compositores = response.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templatesCompositor.compositoresPage(compositores, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel obter a lista de compositores...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        })
                }

                else if(/\/compositores\/C[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores/'+id)
                    .then(response => {
                        var compositor = response.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templatesCompositor.compositorPage(compositor, d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possivel obter o compositor...')
                        res.write('<p>'+erro+'</p>')
                        res.end()
                    })
                }

                else if(/\/compositores\/edit\/C[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/compositores/'+id)
                    .then(response => {
                        var compositor = response.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templatesCompositor.compositorFormEdit(compositor, d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possivel editar o compositor...')
                        res.write('<p>'+erro+'</p>')
                        res.end()
                    })
                }

                else if(req.url == "/compositores/add"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templatesCompositor.compositorForm(d))
                    res.end()
                }

                else if(/\/compositores\/delete\/C[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3]

                    axios.delete('http://localhost:3000/compositores/'+id)
                    .then(() => {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Compositor eliminado com sucesso...</p>')
                        res.write("<p><a href='/compositores'> [Voltar] </a></p>")
                        res.end();
                    })
                    .catch(function (erro) {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possivel eliminar o compositor...')
                        res.write('<p>'+erro+'</p>')
                        res.end()
                    });
                }

                else if(req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templatesCompositor.mainPage(d))
                    res.end()
                }

                else if(req.url == "/periodos"){
                    axios.get('http://localhost:3000/periodos')
                        .then(response => {
                            var periods = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templatesPeriodo.periodsListPage(periods, d));
                            res.end();
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write('<p>Não foi possivel obter a lista de periodos...');
                            res.write('<p>'+erro+'</p>');
                            res.end();
                        })
                }else if(/\/periodos\/.+$/.test(req.url)){
                    console.log("ENTREI");
                    var idPeriod = req.url.split("/")[2];
                    console.log(idPeriod);
                    axios.get('http://localhost:3000/periodos/'+idPeriod)
                        .then(response => {
                            var period = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templatesPeriodo.periodPage(period, d));
                            res.end();
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write('<p>Não foi possivel obter o periodo...');
                            res.write('<p>'+erro+'</p>');
                            res.end();
                        })
                }
                else if(/\/periodos\/add$/.test(req.url)){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(templatesPeriodo.periodForm(d));
                    res.end();
                }

                else if(/\/periodos\/edit\/.+$/.test(req.url)){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    var idPeriod = req.url.split("/")[3];
                    axios.get('http://localhost:3000/periodos/'+idPeriod)
                        .then(response => {
                            var period = response.data;
                            res.write(templatesPeriodo.periodFormEdit(period, d));
                            res.end();
                        })
                        .catch(function(erro){
                            res.write('<p>Não foi possivel obter o periodo...');
                            res.write('<p>'+erro+'</p>');
                            res.end();
                        })
                    }
                else if(/\/periodos\/delete\/.+$/.test(req.url)){
                    var idPeriod = req.url.split("/")[3];
                    axios.delete('http://localhost:3000/periodos/'+idPeriod)
                        .then(() => {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write('<p>Periodo eliminado com sucesso...</p>');
                            res.write("<p><a href='/periodos'> [Voltar] </a></p>");
                            res.end();
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write('<p>Não foi possivel eliminar o periodo...');
                            res.write('<p>'+erro+'</p>');
                            res.end();
                        })
                    }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write('<p>Pedido não suportado: '+ req.url + '</p>')
                    res.write("<p><a href='/'>Voltar</a></p>")
                    res.end()
                }
                break
            case "POST":

                if(req.url == "/compositores/add"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post("http://localhost:3000/compositores/", result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/compositores/' + result.id})
                                    res.write("<p>Compositor adicionado com sucesso...</p>")
                                    res.write("<p><a href='/compositores'> [Voltar] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(506, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write('<p>Não foi possivel inserir o compositor...')
                                    res.write('<p>'+erro+'</p>')
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(507, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel inserir o compositor...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        }
                    });
                }
    
                // POST /alunos/edit/id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.put("http://localhost:3000/compositores/" +id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/compositores/' + result.id})
                                    res.write("<p>Compositor alterado com sucesso...</p>")
                                    res.write("<p><a href='/compositores'> [Voltar] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(506, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write('<p>Não foi possivel inserir o compositor...')
                                    res.write('<p>'+erro+'</p>')
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(507, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel inserir o compositor...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        }
                    });
                }

                else if(req.url == "/periodos/add"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post("http://localhost:3000/periodos/", result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/periodos/' + result.id})
                                    res.write("<p>Periodo adicionado com sucesso...</p>")
                                    res.write("<p><a href='/periodos'> [Voltar] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(506, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write('<p>Não foi possivel inserir o periodo...')
                                    res.write('<p>'+erro+'</p>')
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(507, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel inserir o periodo...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        }
                    });
                } 

                else if(/\/periodos\/edit\/.+$/.test(req.url)){
                    var id = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.put("http://localhost:3000/periodos/" +id, result)
                                .then(resp => {
                                    res.writeHead(200, {'Location': '/periodos/' + result.id})
                                    res.write("<p>Periodo alterado com sucesso...</p>")
                                    res.write("<p><a href='/periodos'> [Voltar] </a></p>")
                                    res.end()
                                })
                                .catch( erro => {
                                    res.writeHead(506, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write('<p>Não foi possivel inserir o periodo...')
                                    res.write('<p>'+erro+'</p>')
                                    res.end()
                                })
                            
                        } else {
                            res.writeHead(507, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel inserir o periodo...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        }
                    });
                }
    
                // POST ? -> Lancar um erro
                else{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write('<p>Metodo POST não suportado:'+ req.url + '</p>')
                    res.write("<p><a href='/'>Voltar</a></p>")
                    res.end()
                }
            break

            default: 
                // Outros metodos nao sao suportados
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<p>Metodo nao suportado: ' + req.method + '</p>')
                res.end()
        }
    }
})

compositoresServer.listen(1902, ()=>{
    console.log("http://localhost:1902/")
})

