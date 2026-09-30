# Automação Cypress - ServeRest

![Testes Cypress](https://github.com/louisylais/automacao-cypress-serverest/actions/workflows/cypress.yml/badge.svg)

Projeto de automação de testes E2E do front-end do [ServeRest](https://front.serverest.dev), com foco nos fluxos de **login** e **cadastro de usuários**.

## Tecnologias

- [Cypress](https://www.cypress.io/)
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) (relatórios HTML)
- GitHub Actions (integração contínua)

## Estrutura

```
cypress/
├── e2e/
│   ├── cadastro.cy.js      # Testes de cadastro de usuários
│   └── login.cy.js         # Testes de login
├── fixtures/
│   └── usuarios.json       # Massa de dados de teste
└── support/
    ├── commands.js         # Comandos customizados (login, cadastro, API)
    └── e2e.js
.github/workflows/cypress.yml  # Pipeline de CI
```

## Como executar

Pré-requisito: Node.js 18 ou superior.

```bash
npm install          # instala as dependências
npm run cy:open      # abre o Cypress no modo interativo
npm test             # executa todos os testes em modo headless
```

Depois da execução headless, o relatório fica em `cypress/reports/index.html`.

## Boas práticas aplicadas

- Seletores estáveis com `data-testid`
- Massa de dados criada via API (`cy.request`) e excluída ao final do teste
- E-mails únicos e fictícios gerados a cada execução, para que os testes não dependam uns dos outros
- Comandos customizados para evitar código repetido
- URLs centralizadas no `cypress.config.js`

## Casos de teste

### Login

| ID | Cenário | Resultado esperado |
|----|---------|--------------------|
| CT01 | Login com credenciais válidas | Redireciona para `/home` e salva o token |
| CT02 | Senha incorreta | "Email e/ou senha inválidos" |
| CT03 | E-mail não cadastrado | "Email e/ou senha inválidos" |
| CT04 | Senha vazia | "Password é obrigatório" |
| CT05 | E-mail em formato inválido | "Email deve ser um email válido" |

### Cadastro

| ID | Cenário | Resultado esperado |
|----|---------|--------------------|
| CT01 | Cadastro com dados válidos | "Cadastro realizado com sucesso" |
| CT02 | Nome vazio | "Nome é obrigatório" |
| CT03 | E-mail vazio | "Email é obrigatório" |
| CT04 | Senha vazia | "Password é obrigatório" |
| CT05 | E-mail em formato inválido | "Email deve ser um email válido" |
| CT06 | E-mail já cadastrado | "Este email já está sendo usado" |
| CT07 | Senha com 1 caractere | Aceito (comportamento atual, possível defeito) |
| CT08 | Nome com 200 caracteres | Aceito (comportamento atual, possível defeito) |
| CT09 | Cadastro como administrador | Redireciona para `/admin/home` |

## Autora

**Louisy Laís** · Analista de Testes / QA
