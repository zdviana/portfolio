# Portfólio — Davi Viana

Portfólio pessoal de **Davi Viana**, desenvolvedor Full Stack Java · Spring Boot · React.

O próprio site é um projeto full stack: front-end em React consumindo uma API REST própria em Spring Boot, com dados em PostgreSQL.

> Em construção: o front-end já está pronto; a API (projetos e formulário de contato) está em desenvolvimento.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Front-end | React, Vite, CSS Modules, Framer Motion, Vitest + Testing Library |
| Back-end | Java 25, Spring Boot 4, Spring Data JPA, Bean Validation, Flyway, Springdoc OpenAPI |
| Banco | PostgreSQL |
| Infra | Docker Compose |

## Como rodar

Front-end (requer Node.js 24+):

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm test
```

Back-end (requer JDK 25 e Docker):

```bash
docker compose up -d db
cd backend
./mvnw spring-boot:run
```

## Estrutura

```
frontend/   # React (seções, componentes, dados em src/data/profile.json)
backend/    # API Spring Boot (pacote dev.daviviana.portfolio)
docker-compose.yml
```
