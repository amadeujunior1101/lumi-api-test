# Lumi API

Este projeto utiliza:

- Node.js
- Typescript
- Nodemon
- Sequelize
- Pdf-parse
- Postgres
- Express
- Uuid
- Cors

## Executando a Aplicação

- No terminal:

1 - clone do repositorio: 

  git clone https://github.com/amadeujunior1101/lumi-api-test

2 - acesse a pasta:

  cd lumi-api-test

3 - baixe as dependências:

  yarn ou npm i

4 - crie o arquivo .env na raíz do projeto e set o valor com endereço da API referente:

    HOST=localhost
    DATABASE=postgres
    USERNAME_DB=postgres
    PASSWORD=postgres
	
5 - (Opcional) Caso não tenha o postgres instalado, pode criar um container docker:

    docker run --name test-lumi -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

6 - (Opcinal) Executando todo o projeto com docker-compose

    * altere no arquivo .env:
        HOST=db

    yarn docker-compose build

    yarn docker-compose up

7 - na pasta lumi-api-test:

	yarn start:dev ou npm run start:dev
