describe('Teste Login Serverest', () => {

  const senhaValida = 'senha123'
  let emailValido

  beforeEach(() => {
    emailValido = 'louisylais+' + Date.now() + '@gmail.com'
    cy.request('POST', 'https://serverest.dev/usuarios', {
      nome: 'Louisy Lais',
      email: emailValido,
      password: senhaValida,
      administrador: 'false'
    })
  })

  // CT01 - Login com sucesso
  it('CT01 - Deve fazer login com sucesso', () => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').type(emailValido)
    cy.get('[data-testid="password"]').type(senhaValida)
    cy.get('[data-testid="entrar"]').click()
    cy.contains('Bem Vindo').should('be.visible')
  })

  // CT02 - Senha incorreta
  it('CT02 - Não deve logar com senha incorreta', () => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').type(emailValido)
    cy.get('[data-testid="password"]').type('senhaErrada')
    cy.get('[data-testid="entrar"]').click()
    cy.contains('Email e/ou senha inválidos').should('be.visible')
  })

  // CT03 - Email não cadastrado
  it('CT03 - Não deve logar com email não cadastrado', () => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').type('naoexiste+' + Date.now() + '@gmail.com')
    cy.get('[data-testid="password"]').type(senhaValida)
    cy.get('[data-testid="entrar"]').click()
    cy.contains('Email e/ou senha inválidos').should('be.visible')
  })

  // CT04 - Senha vazia
  it('CT04 - Não deve logar com senha vazia', () => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').type(emailValido)
    cy.get('[data-testid="entrar"]').click()
    cy.contains('Password é obrigatório').should('be.visible')
  })

  // CT05 - Email formato inválido
  it('CT05 - Não deve logar com email inválido', () => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').type('emailinvalido')
    cy.get('[data-testid="password"]').type('teste')
    cy.get('[data-testid="entrar"]').click()
    cy.contains('Email deve ser um email válido').should('be.visible')
  })

})
