// Gera um e-mail único e fictício (não usa e-mail real, pois o ServeRest é público)
Cypress.Commands.add('gerarEmail', (prefixo = 'qa') => {
  return cy.wrap(`${prefixo}+${Date.now()}${Cypress._.random(1000, 9999)}@teste.com`)
})

// Cria um usuário via API e devolve { _id, nome, email, password }
Cypress.Commands.add('criarUsuarioApi', (dados = {}) => {
  return cy.gerarEmail().then((email) => {
    const usuario = {
      nome: 'Usuario Teste',
      email,
      password: 'senha123',
      administrador: 'false',
      ...dados,
    }
    return cy
      .request('POST', `${Cypress.env('apiUrl')}/usuarios`, usuario)
      .then((res) => {
        expect(res.status).to.eq(201)
        return { ...usuario, _id: res.body._id }
      })
  })
})

// Exclui um usuário via API (usado na limpeza da massa de dados)
Cypress.Commands.add('excluirUsuarioApi', (id) => {
  if (!id) return
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
    failOnStatusCode: false,
  })
})

// Preenche e envia o formulário de login. Campos não informados ficam vazios.
Cypress.Commands.add('login', (email, senha) => {
  cy.visit('/login')
  if (email) cy.get('[data-testid="email"]').type(email)
  if (senha) cy.get('[data-testid="password"]').type(senha, { log: false })
  cy.get('[data-testid="entrar"]').click()
})

// Preenche e envia o formulário de cadastro. Campos não informados ficam vazios.
Cypress.Commands.add('cadastrar', ({ nome, email, senha, administrador = false } = {}) => {
  cy.visit('/cadastrarusuarios')
  if (nome) cy.get('[data-testid="nome"]').type(nome)
  if (email) cy.get('[data-testid="email"]').type(email)
  if (senha) cy.get('[data-testid="password"]').type(senha, { log: false })
  if (administrador) cy.get('[data-testid="administrador"]').check()
  cy.get('[data-testid="cadastrar"]').click()
})
