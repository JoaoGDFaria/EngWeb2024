# TPC4

## Enunciado

O objetivo deste TPC incide em criar páginas *HTML/CSS* tendo por base um ficheiro em formato `JSON` com informação relativa a compositores e os períodos em questão de cada um. É necessário que essas páginas permitam adicionar, apagar e modificar entradas do ficheiro.

## Resumo do Script `script.py`

O script Python `script.py` processa dados de compositores musicais em formato JSON, do ficheiro `"dataset_raw.json"`. A função `read_json_file()` analisa os compositores e agrupa-os por período musical, enquanto a função `concatenate_json_file()` cria um novo ficheiro JSON organizando os dados por períodos. A execução principal do script ocorre ao chamar `read_json_file()`, resultando na criação do arquivo `"dataset.json"`. Este script simplifica a organização e estruturação de informações sobre compositores musicais.


## Resumo do ficheiro `server.js`

O ficheiro `server.js` é um servidor HTTP escrito em Node.js que lida com diferentes rotas e métodos HTTP para interagir com uma API de compositores e períodos. Ele utiliza o módulo `axios` para fazer requisições HTTP para a API e os módulos `templatesCompositor` e `templatesPeriodo` para renderizar templates HTML dinâmicos.

## Funcionalidades do server.js:

- **Rotas e Métodos HTTP:**
  - Lida com requisições GET e POST para diferentes rotas, como `/compositores`, `/periodos`, `/compositores/add`, `/periodos/add`, `/compositores/edit/:id`, `/periodos/edit/:id`, `/compositores/delete/:id`, e `/periodos/delete/:id`.
  - Responde de acordo com os códigos de status HTTP e gera páginas HTML dinâmicas usando os templates disponíveis.

- **Gestão de Requests:**
  - Coleta dados de entrada do corpo da requisição.
  - Lida com diferentes tipos de conteúdo, como formulários codificados em `application/x-www-form-urlencoded`.
  
### Interação com os templates:

O arquivo `server.js` interage com os módulos `templatesCompositor` e `templatesPeriodo` para renderizar HTML dinâmico com base nos dados obtidos da API. Esses módulos contêm funções que geram código HTML com base nos dados passados como argumentos

