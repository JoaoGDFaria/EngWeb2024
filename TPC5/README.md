# TPC5

## Enunciado

O objetivo deste TPC incide em criar páginas *HTML/CSS* tendo por base um ficheiro em formato `JSON` com informação relativa a compositores e os períodos em questão de cada um. É necessário que essas páginas permitam adicionar, apagar e modificar entradas do ficheiro. Criando uma aplicação Web tendo CRUD sobre compositores e periodos.


## Resolução

Este é um aplicativo Node.js que utiliza o framework Express para criar rotas que interagem com uma API REST de compositores e periodos. O código utiliza o módulo Axios para fazer requists. Utilizando varias rotas como para criar, editar, apagar e ver tanto compositores como periodos. 
O que difere deste projeto para o anterior é a utlização de Pug que passo a explicar:

### Interação com Pug

- As páginas HTML são renderizadas usando o mecanismo de template Pug.
- Os dados dinâmicos são passados para as views Pug como variáveis, permitindo sua renderização.
