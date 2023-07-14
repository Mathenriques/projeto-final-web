# Projeto Final NodeJs
Projeto final da disciplina COM222 - Desenvolvimento de Sistemas Web da Universidade Federal de Itajubá.

Esse projeto visa a criação de um sistema web para gerenciamento de leitos de UTI.
## Como inicializar

Para inicializar o projeto, é necessário seguir os passos abaixo:

### Passo 1: Instalação Docker

Instale o Docker em sua maquina, para isso recomendo olhar a documentação:

[Documentação Docker](https://docs.docker.com/get-docker/)

### Passo 2: Clonar o projeto

Clone o projeto em sua máquina

### Passo 3: Arquivos bases

#### Passo 3.1: Arquivo .env

Dentro da pasta raiz do projeto, encontra-se um arquivo chamado `.env.example`, renomeie esse arquivo para `.env`

#### Passo 3.2: Bibliotecas 

Abra o terminal na pasta raiz do projeto, e digite: `npm install`

### Passo 4: Banco de dados

1. Antes é necessário subir o container do docker, para isso abra o terminal na pasta raiz do projeto e digite: `docker-compose up`

**Obs: NÃO FECHE ESSE TERMINAL, CASO ENCERRE TAMBÉM ENCERRARÁ O CONTAINER**

2. Para criar o banco de dados, digite em um novo terminal: `npx prisma migrate dev`

A partir desse momento seu banco de dados já foi criado

### Passo 5: Rodar a Aplicação

Para rodar a aplicação e subir o servidor, rode no terminal: `npm run start:dev`

### Passo 6: Rotas importantes

Antes de começar a usar a aplicação é necessária que execute as rotas abaixo:

Podem ser executadas no navegador, mas dê preferencia para sistemas como: Postman e Insomnia

```shell

\\ Rota para criar admin master:
Método: 'POST'
URL: 'http://localhost:3333/register-admin'
Status-Code-Retorno: 201

\\ Rota para criar leitos de UTI:
Método: 'POST'
URL: 'http://localhost:3333/register-uti-bed'
Status-Code-Retorno: 201

```

As rotas acima só podem ser executadas uma vez, as demais vezes ela informará erro.


### Pronto! Agora sua aplicação está pronta para se conectar com o Front-end