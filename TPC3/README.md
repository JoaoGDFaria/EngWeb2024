# TPC3

## Enunciado

Neste TPC foi nos dado o ficheiro `dataset_raw.json` com necessidade de ser corrigido de forma a ser possível a sua utilização. Nele encontramos informações relativas a filmes, que servirão de base para criar páginas em HTML com informação dos mesmos, das categorias e dos atores que neles participam.

## Descrição dos ficheiros utilizados

### `corretor.py`

Este ficheiro vai tratar, não só da correção para um formato válido de json, como também da identação do mesmo de forma a facilitar a sua escrita. Ao utilizar este *script* passando como argumento o `dataset_raw.json` ele será rescrito no formato do ficheiro `dataset.json`, sendo que neste repositório temos presentes as duas versões como termo de comparação.


### `server.js`

Este é um ficheiro Node.js que cria um servidor HTTP para fornecer informações sobre filmes, atores e gêneros a partir de uma API REST. Aqui está uma breve descrição do seu funcionamento:

- O código utiliza os módulos `http`, `fs`, `url`, e `axios` para lidar com solicitações HTTP, sistema de arquivos, análise de URL e realizar solicitações HTTP relativas ao **json-server** do `datast.json`, respectivamente.

- Ele define objetos vazios para armazenar informações sobre atores e gêneros, juntamente com mapas para mapear IDs para atores e gêneros.

- Um servidor HTTP é criado usando `http.createServer`, que responde a diferentes rotas:

  - `/`: Apresenta uma página inicial com opções para visualizar filmes, atores ou gêneros.
  
  - `/filmes`: Recupera os filmes da API REST, cria uma lista de links para cada filme e os exibe.
  
  - `/filmes/{id}`: Obtém detalhes de um filme específico com base no ID fornecido na URL e exibe título, ano, elenco e gêneros.
  
  - `/atores`: Recupera os filmes da API REST, extrai informações sobre os atores de cada filme e exibe uma lista de atores com links para suas páginas individuais.
  
  - `/atores/{id}`: Obtém detalhes de um ator específico com base no ID fornecido na URL e exibe seu nome e os filmes em que atuou.
  
  - `/generos`: Recupera os filmes da API REST, extrai informações sobre os gêneros de cada filme e exibe uma lista de gêneros com links para suas páginas individuais.
  
  - `/generos/{id}`: Obtém detalhes de um gênero específico com base no ID fornecido na URL e exibe seu nome e os filmes associados a ele.

- Caso contrário, se nenhuma das rotas corresponder, ele retorna uma mensagem indicando que a página não foi encontrada.

- O servidor escuta na porta 7777 e exibe uma mensagem no terminal indicando que está disponível.

Este ficheiro é um exemplo de como criar um servidor web simples em *Node.js* e utilizar uma API REST para fornecer informações dinâmicas sobre filmes, atores e gêneros.
