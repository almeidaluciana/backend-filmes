# Filmes API

API para gerenciar filmes com autenticação de usuários.  
Construída com **Node.js**, **Express**, **Sequelize** e **MySQL**.

## Tecnologias utilizadas

- Node.js
- Express
- Sequelize (ORM)
- MySQL
- JWT (JSON Web Tokens) para autenticação
- bcryptjs para hash de senhas
- CORS

## Funcionalidades

- Registrar e autenticar usuários.
- CRUD de filmes:
  - Criar filme.
  - Listar todos os filmes.
  - Buscar filme por ID.
  - Atualizar filme.
  - Deletar filme.
- Proteção das rotas de filmes via JWT.

## Variáveis de ambiente

## Como executar?

Clone o repositório:

```sh
git clone https://github.com/almeidaluciana/backend-filmes.git
```

Acesse a pasta do projeto:

```sh
cd backend-filmes
```

Instale as dependências:

```sh
npm i
```

Abra o projeto no VS Code:

```sh
code .
```

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```sh
PORT=3000
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLDATABASE=nome_do_banco
MYSQLUSER=usuario
MYSQLPASSWORD=senha
SECRET_KEY=sua_chave_secreta
```

Inicialize o servidor:

```sh
npm start
```

O servidor será iniciado em http://localhost:3000.
