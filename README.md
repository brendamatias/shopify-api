# Shopify API

A **Shopify Integration API** é uma API desenvolvida para facilitar a integração e o gerenciamento de produtos em uma loja Shopify. Esta API fornece uma interface para realizar operações CRUD (Create, Read, Update, Delete) nos produtos da loja, aproveitando as capacidades da Shopify API.

## Funcionalidades

- **Gerenciamento de Produtos**: Adicione, atualize e remova produtos da sua loja Shopify.
- **Consulta de Produtos**: Recupere detalhes dos produtos.
- **Integração com Shopify API**: Conecte-se diretamente à Shopify para realizar operações na loja.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para executar a aplicação.
- **Express**: Framework para construção da API.
- **Prisma**: ORM para interação com o banco de dados.
- **Shopify API**: Biblioteca para integração com a Shopify.
- **Swagger**: Documentação da API.
- **Jest**: Testes automatizados.

## Sumário

- [Instalação](#instalação)
- [Uso](#uso)
- [Testes](#testes)

## Instalação

Para instalar e executar a aplicação, siga os passos abaixo:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/brendamatias/shopify-api
   cd shopify-api
   ```

2. **Instale as dependências:**

   Certifique-se de ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados. Depois, execute:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:

   - Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.
     ```bash
     cp .env.example .env
     ```
   - Edite o arquivo `.env` para incluir suas configurações específicas.

4. **Configure o banco de dados**:

   - Certifique-se de que o banco de dados está configurado corretamente e acessível.

5. **Execute as migrações** (se aplicável):

   ```bash
   npx prisma migrate deploy
   ```

6. **Inicie a aplicação**:
   ```bash
   npm start
   ```

## Uso com Docker

1. **Certifique-se de ter o Docker e o Docker Compose instalados**.

2. **Configure as variáveis de ambiente**:

   - Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.
     ```bash
     cp .env.example .env
     ```
   - Edite o arquivo `.env` para incluir suas configurações específicas.

3. **Inicie os serviços com Docker Compose**:

   ```bash
   docker-compose up db -d
   docker-compose up app
   ```

   Isso criará e iniciará os containers definidos no seu `docker-compose.yml`.

4. **Para parar os serviços**:
   ```bash
   docker-compose down
   ```

## Testes

Para executar os testes automatizados, utilize:

```bash
docker-compose up db_test -d
npm test
```

## Documentação

A API é documentada com Swagger e pode ser acessada em:

```
http://localhost:3333/docs
```
