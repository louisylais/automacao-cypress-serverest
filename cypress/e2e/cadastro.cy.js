describe('Teste Cadastro Serverest', () => {

  // CT01 - Fluxo feliz
  it('CT01 - Deve cadastrar um usuário com sucesso', () => {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('Louisy Lais')
    cy.get('[data-testid="email"]').type('louisylais+' + Date.now() + '@gmail.com')
    cy.get('[data-testid="password"]').type('12345')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
  })

  // CT02 - Campos obrigatórios
  it('CT02 - Não deve cadastrar com campo nome vazio', () => {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('')
    cy.get('[data-testid="email"]').type('louisylais+' + Date.now() + '@gmail.com')
    cy.get('[data-testid="password"]').type('12345')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Nome é obrigatório').should('be.visible')
  })

  it('CT03 - Não deve cadastrar com campo email vazio', () => {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('Teste Usuario')
    cy.get('[data-testid="email"]').type('')
    cy.get('[data-testid="password"]').type('12345')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Email é obrigatório').should('be.visible')
  })

  it('CT04 - Não deve cadastrar com campo senha vazia', () => {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('Teste Usuario')
    cy.get('[data-testid="email"]').type('louisylais+' + Date.now() + '@gmail.com')
    cy.get('[data-testid="password"]').type('')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Password é obrigatório').should('be.visible')
  })

  // CT05 - Email inválido
  it('CT05 - Não deve cadastrar com email em formato inválido', () => {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('Teste Usuario')
    cy.get('[data-testid="email"]').type('emailinvalido')
    cy.get('[data-testid="password"]').type('12345')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Email deve ser um email válido').should('be.visible')
  })

  // CT06 - Email duplicado
  it('CT06 - Não deve cadastrar com email já existente', () => {
    const emailFixo = 'teste.duplicado@gmail.com'
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('Usuario 1')
    cy.get('[data-testid="email"]').type(emailFixo)
    cy.get('[data-testid="password"]').type('12345')
    cy.get('[data-testid="cadastrar"]').click()
    
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('Usuario 2')
    cy.get('[data-testid="email"]').type(emailFixo)
    cy.get('[data-testid="password"]').type('12345')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Este email já está sendo usado').should('be.visible')
  })

  // CT07 - Senha pequena
  it('CT07 - Deve cadastrar mesmo com senha pequena', () => {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('Teste Senha')
    cy.get('[data-testid="email"]').type('louisylais+' + Date.now() + '@gmail.com')
    cy.get('[data-testid="password"]').type('1')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
  })

  // CT08 - Nome grande
  it('CT08 - Deve cadastrar com nome muito grande', () => {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('A'.repeat(200))
    cy.get('[data-testid="email"]').type('louisylais+' + Date.now() + '@gmail.com')
    cy.get('[data-testid="password"]').type('12345')
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
  })

  // CT09 - Admin
  it('CT09 - Deve cadastrar usuário como administrador', () => {
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="nome"]').type('Admin Teste')
    cy.get('[data-testid="email"]').type('admin+' + Date.now() + '@gmail.com')
    cy.get('[data-testid="password"]').type('12345')
    cy.get('[data-testid="administrador"]').check()
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
  })

})