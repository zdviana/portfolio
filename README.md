# Portfólio — Davi Viana

Portfólio pessoal de **Davi Viana**, desenvolvedor Full Stack Java · Spring Boot · React.

O próprio site é um projeto full stack: front-end em React consumindo uma API REST própria em Spring Boot, com dados em PostgreSQL.

Se a API estiver fora do ar, o site continua funcionando: os projetos vêm de um JSON local e o formulário de contato abre o e-mail do visitante.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Front-end | React, Vite, CSS Modules, Framer Motion, Vitest + Testing Library |
| Back-end | Java 25, Spring Boot 4, Spring Data JPA, Bean Validation, Flyway, Springdoc OpenAPI |
| Banco | PostgreSQL |
| Testes | JUnit 5, Mockito, Testcontainers (PostgreSQL real), Vitest + Testing Library |
| Infra | Docker Compose |

## API

| Método | Rota | Função |
| --- | --- | --- |
| GET | `/api/projects` | Lista os projetos exibidos no site |
| GET | `/api/projects/{id}` | Detalhe de um projeto (404 em formato ProblemDetail) |
| POST | `/api/contact` | Recebe mensagem do formulário (validação; 400 com erros por campo) |
| GET | `/api/health` | Status da API (Spring Actuator) |
| GET | `/swagger-ui.html` | Documentação interativa (OpenAPI) |

O schema do banco é versionado com Flyway em `backend/src/main/resources/db/migration`.

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
./mvnw spring-boot:run   # http://localhost:8080/swagger-ui.html
./mvnw test              # sobe um PostgreSQL temporário via Testcontainers
```

Em produção, o front lê a URL da API de `VITE_API_URL` (veja `frontend/.env.example`) e a API aceita as origens de `CORS_ALLOWED_ORIGINS`; o banco é configurado por `DB_URL`, `DB_USER` e `DB_PASSWORD`.

## Estrutura

```
frontend/   # React (seções, componentes, dados em src/data/profile.json)
backend/    # API Spring Boot (pacote dev.daviviana.portfolio)
docker-compose.yml
```
