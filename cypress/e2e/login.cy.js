describe('Login - ServeRest', () => {
  let usuario

  beforeEach(function () {
    // Só cria usuário via API nos testes que precisam de um usuário cadastrado
    if (this.currentTest.title.includes('[usuario]')) {
      cy.criarUsuarioApi().then((u) => { usuario = u })
    }
  })

  afterEach(() => {
    if (usuario) cy.excluirUsuarioApi(usuario._id)
    usuario = undefined
  })

  it('CT01 - Deve fazer login com sucesso [usuario]', () => {
    cy.login(usuario.email, usuario.password)
    cy.url().should('include', '/home')
    cy.contains('Bem Vindo').should('be.visible')
    cy.window().its('localStorage.serverest/userToken').should('exist')
  })

  it('CT02 - Não deve logar com senha incorreta [usuario]', () => {
    cy.fixture('usuarios').then((dados) => {
      cy.login(usuario.email, dados.senhaIncorreta)
    })
    cy.contains('Email e/ou senha inválidos').should('be.visible')
    cy.url().should('include', '/login')
  })

  it('CT03 - Não deve logar com email não cadastrado', () => {
    cy.gerarEmail('naoexiste').then((email) => {
      cy.login(email, 'senha123')
    })
    cy.contains('Email e/ou senha inválidos').should('be.visible')
    cy.url().should('include', '/login')
  })

  it('CT04 - Não deve logar com senha vazia [usuario]', () => {
    cy.login(usuario.email)
    cy.contains('Password é obrigatório').should('be.visible')
  })

  it('CT05 - Não deve logar com email em formato inválido', () => {
    cy.fixture('usuarios').then((dados) => {
      cy.login(dados.emailInvalido, 'teste')
    })
    cy.contains('Email deve ser um email válido').should('be.visible')
  })
})
