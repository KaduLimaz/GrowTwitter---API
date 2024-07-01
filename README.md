# API GrowTwitter

Esta é a API backend para o GrowTwitter, uma aplicação similar ao Twitter. Este projeto foi desenvolvido utilizando Node.js, Express, Prisma para ORM e PostgreSQL como banco de dados.

## Funcionalidades

- Registro, autenticação e gerenciamento de usuários.
- Publicação, edição, exclusão e busca de tweets.
- Sistema de likes, retweets e respostas a tweets.
- Gerenciamento de seguidores e seguindo.

## Configuração

Antes de executar a API, certifique-se de ter o Node.js e o PostgreSQL instalados.

1. **Clone o repositório**

2. Instale as dependências: npm install

3. Configuração do banco de dados:
     * Crie um banco de dados PostgreSQL chamado API-growtwitter.
     * Copie o conteúdo de .env.example para um novo arquivo .env e configure suas variáveis de ambiente, como DATABASE_URL

4. Executar as migrações do banco de dados:
     * npx prisma migrate dev

5. Executar o servidor de desenvolvimento: npm run dev

  
