# API Searchdex

## Sobre o Projeto

API Searchdex é um serviço responsável por indexar e realizar buscas em documentos. Este projeto é construído utilizando Node.js e oferece endpoints para gerenciar operações de busca.

## Como Executar

### Manualmente via Terminal

1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd api-searchdex
```

2. Instale as dependências
```bash
npm install
```

3. Compile o código
```bash
npm run build
```

4. Execute o servidor
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

### Utilizando Docker

1. Construa a imagem Docker
```bash
docker build -t api-searchdex .
```

2. Execute o container
```bash
docker run -p 3000:3000 api-searchdex
```

O servidor estará disponível em `http://localhost:3000`.

### Utilizando Docker Compose

1. Crie um arquivo `docker-compose.yml` na raiz do projeto
```yaml
version: '3'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    restart: always
```

2. Execute com Docker Compose
```bash
docker-compose up -d
```

## Próximos Passos

- **Autenticação**: Implementar sistema de autenticação e autorização (JWT, OAuth, etc)
- **Middleware de Tratamento de Erros**: Criar um middleware centralizado para tratar erros e padronizar respostas
- **Testes**: Adicionar testes unitários e de integração (Jest, Mocha, etc)
- **Documentação da API**: Implementar Swagger/OpenAPI para documentação dos endpoints
- **CI/CD**: Configurar pipeline de integração e entrega contínua