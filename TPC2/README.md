# TPC2

## Enunciado

Neste TPC foi necessário, dado um ficheiro JSON com informações de cidades, criar páginas plain HTML que contenha a informação das mesmas.


## Descrição dos ficheiros JavaScript e Python

### `server.js`

Este programa cria um servidor HTTP para lidar com solicitações de informações sobre cidades. Ele trata do route das solicitações para obter informações específicas de uma cidade a partir de um servidor JSON. Funcionalidades principais:

1. **Criação do Servidor HTTP:** Utiliza o módulo `http` para criar um servidor HTTP na porta 1902.
2. **Roteamento de Solicitações:** Responde a solicitações de raiz ("/") com uma lista de hiperlinks para cada cidade. Para solicitações específicas de cidade, obtém detalhes dessa cidade a partir do servidor JSON.
3. **Integração com Script Python:** Solicita informações detalhadas sobre cidades ao script Python `script.py` para gerar páginas HTML correspondentes.

### `script.py`

Este script lê dados de um arquivo JSON contendo informações sobre cidades e suas conexões, e gera páginas HTML individuais para cada cidade. Funcionalidades principais:

1. **Leitura de Dados JSON:** Lê o arquivo "cities.json" e carrega os dados.
2. **Criação de Diretório "Cities":** Cria a diretoria "Cities" para armazenar arquivos HTML individuais para cada cidade.
3. **Extração de Informações das Cidades:** Extrai informações relevantes sobre cada cidade.
4. **Geração de Páginas HTML:** Gera páginas HTML com informações detalhadas sobre cada cidade e suas conexões, armazenando-as no diretório "Cities".


## Desenvolvido por:
- João Gomes Dias de Faria - a100553 - UMinho 2024
