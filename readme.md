# Trabalho da disciplina de Java para Web :mortar_board:

## Projeto Final - Parte 1 - Backend :rocket:

:page_facing_up: Requisitos Obrigatórios

- O tema do projeto é livre

:heavy_check_mark:  Deve conter API rest para todo o fluxo de cadastro (inserção, alteração, exclusão e consulta) de no mínimo 2 entidades
  -  Exemplo: Cliente e Titulo de um sistema de contas, Cliente e Locação de um sistema de locação, Proprietário e Animal de um sistema para controle de pets
  
:heavy_check_mark:  Deve conter algum relatório, acessível via API, que exporte dados retornando um arquivo em formato csv para download
  - Exemplo: dados do proprietário e do animal do sistema de controle de pet
    - codigo do proprietário;nome proprietário;cpf;nome do animal;data nascimento do animal; ultima visita no petshop

:heavy_check_mark:  Deve conter alguma lógica que utilize dados externos acessados via API.
  - Exemplo: No sistema de título pode receber o título em dolar e traduzir para real consultando a cotação em uma api externa

:heavy_check_mark:  Deve conter alguma consulta com consolide dados inseridos retornando um json com o resultado via api.
  - Exemplo: Total gasto vs total recebido por dia no sistema de contas

:heavy_check_mark:  Deve-se utilizar NeDB gravando os dados em json

:heavy_check_mark:  O projeto será desenvolvido individualmente

:heavy_check_mark:  Ambiente preparado para validar as requisições - Postman, Swagger ou similar

:heavy_check_mark:  Utilização de códigos HTTP e padrões de restful baseado na [documentação](https://www.restapitutorial.com/)

:chart_with_upwards_trend: Diferenciais:

- Gestão de usuário com rotas de login e autenticação
- Relacionamento entre entidades

## Install
 
> **Important!** Ts.ED requires [Node](https://nodejs.org/en/) >= 6, Express >= 4 and [TypeScript](https://www.typescriptlang.org/) >= 2.7.

```batch
npm install
```

## Run

```
npm start
```
