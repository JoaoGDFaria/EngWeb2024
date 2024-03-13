exports.compositoresPage = (compositores,d) => {
   var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositores</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Compositores
                    <a class="w3-btn w3-round w3-grey" href="/compositores/add">+</a>
                    </h1>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome</th><th>Data Nascimento</th><th>Data Obito</th><th>Periodo</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < compositores.length ; i++){
        pagHTML += `
                <tr>    
                    <td>         
                        <a href="/compositores/${compositores[i].id}">
                            ${compositores[i].nome}
                        </a>
                    </td>
                    <td>${compositores[i].dataNasc}</td>
                    <td>${compositores[i].dataObito}</td>
                    <td>${compositores[i].periodo}</td>
                    <td>[<a class="w3-btn w3-round w3-teal" href="/compositores/edit/${compositores[i].id}">Edit</a>]
                    [<a class="w3-btn w3-round w3-red" href="/compositores/delete/${compositores[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by JoaoGDFaria in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.compositorPage = (compositor,d) => {
    var pagHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel ="stylesheet" href="./extras/w3.css"/>
        <title>${compositor.nome}</title>
    </head>
    <body>
        <div class="w3-card-4">
            <header class = "w3-container w3-teal">
                <h1>${compositor.nome}</h1>
            </header>
            <div class="w3-container">
                <p><b>Data de Nascimento: </b>${compositor.dataNasc}</p>
                <p><b>Data de Óbito: </b>${compositor.dataObito}</p>
                <p><b>Período: </b>${compositor.periodo}</p>
                <p><b>Bio: </b>${compositor.bio}</p>
            </div>
            <br>
        <footer class="w3-container w3-blue">
            <h5>Generated by JoaoGDFaria in ${d} - [<a href="/">Return</a>]</h5>
        </footer>
        </div>


    </body>
    </html>
    `
    return pagHTML
}

exports.compositorForm = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="./extras/w3.css"/>
            <title>Compositor Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Compositor Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                <fieldset>
                    <legend>Metadata</legend>
                    <label>Id</label>
                    <input class="w3-input w3-round" type="text" name="id"/>
                    <label>Nome</label>
                    <input class="w3-input w3-round" type="text" name="nome"/>
                    <label>Data de Nascimento</label>
                    <input class="w3-input w3-round" type="text" name="dataNasc"/>
                    <label>Data de Óbito</label>
                    <input class="w3-input w3-round" type="text" name="dataObito"/>
                    <label>Período</label>
                    <input class="w3-input w3-round" type="text" name="periodo"/>
                    <label>Bio</label>
                    <input class="w3-input w3-round" type="text" name="bio"/>
                </fieldset>

                    
                    <br/>
                    <button class="w3-btn w3-red w3-mb-2" type="submit">Register</button>

                </form>
                <br/>
                <footer class="w3-container w3-purple">
                    <h5>Generated by JoaoGDFaria in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
}

exports.compositorFormEdit = function(compositor, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>${compositor.nome}</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Compositor Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${compositor.id}"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${compositor.nome}"/>
                        <label>Data de Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${compositor.dataNasc}"/>
                        <label>Data de Óbito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${compositor.dataObito}"/>
                        <label>Período</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${compositor.periodo}"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${compositor.bio}"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-red w3-mb-2" type="submit">Submit Changes</button>
                </form>
                <br/>
                <footer class="w3-container w3-purple">
                    <h5>Generated by JoaoGDFaria in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}

exports.mainPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositores</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Compositores</h1>
                </header>
                <div class="w3-container">
                    <p>HOME PAGE</p>
                </div>
                [<a class="w3-btn w3-round w3-teal" href="/compositores">Compositores</a>]
                [<a class="w3-btn w3-round w3-red" href="/periodos">Periodos</a>]
                <footer class="w3-container w3-blue">
                    <h5>Generated by JoaoGDFaria in ${d}</h5>
                </footer>
            </div>
        </body>
        `
}

// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <p>${d}: Error: ${errorMessage}</p>
    `
}