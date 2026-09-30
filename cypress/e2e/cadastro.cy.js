describe('Cadastro de usuários - ServeRest', () => {
  let dados

  before(() => {
    cy.fixture('usuarios').then((f) => { dados = f })
  })

  it('CT01 - Deve cadastrar um usuário com sucesso', () => {
    cy.gerarEmail().then((email) => {
      cy.cadastrar({ nome: dados.valido.nome, email, senha: dados.valido.senha })
    })
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
    cy.url().should('include', '/home')
  })

  it('CT02 - Não deve cadastrar com campo nome vazio', () => {
    cy.gerarEmail().then((email) => {
      cy.cadastrar({ email, senha: dados.valido.senha })
    })
    cy.contains('Nome é obrigatório').should('be.visible')
  })

  it('CT03 - Não deve cadastrar com campo email vazio', () => {
    cy.cadastrar({ nome: dados.valido.nome, senha: dados.valido.senha })
    cy.contains('Email é obrigatório').should('be.visible')
  })

  it('CT04 - Não deve cadastrar com campo senha vazio', () => {
    cy.gerarEmail().then((email) => {
      cy.cadastrar({ nome: dados.valido.nome, email })
    })
    cy.contains('Password é obrigatório').should('be.visible')
  })

  it('CT05 - Não deve cadastrar com email em formato inválido', () => {
    cy.cadastrar({ nome: dados.valido.nome, email: dados.emailInvalido, senha: dados.valido.senha })
    // O campo é type="email": a validação nativa do navegador bloqueia o envio
    cy.get('[data-testid="email"]').invoke('prop', 'validationMessage').should('not.be.empty')
    cy.url().should('include', '/cadastrarusuarios')
  })

  it('CT06 - Não deve cadastrar com email já existente', () => {
    // Pré-condição criada via API: o teste de tela valida apenas a duplicidade
    cy.criarUsuarioApi().then((existente) => {
      cy.cadastrar({ nome: 'Outro Usuario', email: existente.email, senha: dados.valido.senha })
      cy.contains('Este email já está sendo usado').should('be.visible')
      cy.excluirUsuarioApi(existente._id)
    })
  })

  // Documenta o comportamento atual: o sistema não exige tamanho mínimo de senha.
  // Possível defeito de regra de negócio, a ser confirmado com o requisito.
  it('CT07 - Aceita cadastro com senha de 1 caractere (comportamento atual)', () => {
    cy.gerarEmail().then((email) => {
      cy.cadastrar({ nome: 'Teste Senha', email, senha: '1' })
    })
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
  })

  // Documenta o comportamento atual: o sistema não limita o tamanho do nome.
  it('CT08 - Aceita cadastro com nome de 200 caracteres (comportamento atual)', () => {
    cy.gerarEmail().then((email) => {
      cy.cadastrar({ nome: 'A'.repeat(200), email, senha: dados.valido.senha })
    })
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
  })

  it('CT09 - Deve cadastrar usuário como administrador', () => {
    cy.gerarEmail('admin').then((email) => {
      cy.cadastrar({ nome: 'Admin Teste', email, senha: dados.valido.senha, administrador: true })
    })
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
    cy.url().should('include', '/admin/home')
  })
})
