import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import cadastroPage from '../pages/CadastroPage'

Given('que o usuário acessa a tela de cadastro', () => {
  cadastroPage.visitar('/cadastro')
})

Given('que já existe um usuário cadastrado com o e-mail {string}', (email) => {
  cadastroPage.preencherCadastro('Usuario Existente', email, 'Senha123')
  cadastroPage.acionarBotao('Cadastrar')
  cy.contains(
    /Usuário inserido com sucesso|Endereço de email já utilizado/
  ).should('be.visible')
  cadastroPage.visitar('/cadastro')
})

Given('que o usuário concluiu um cadastro válido com e-mail e senha conhecidos', () => {
  const senha = 'Senha123'

  cy.wrap(senha).as('senhaCadastro')
  cadastroPage.preencherCadastro('Maria Silva', 'novo', senha)
  cadastroPage.acionarBotao('Cadastrar')
  cy.contains('Usuário inserido com sucesso').should('be.visible')
})

When('o usuário preenche o cadastro com nome {string}, email {string} e senha {string}', (nome, email, senha) => {
  cadastroPage.preencherCadastro(nome, email, senha)
})

When('o usuário preenche o campo {string} com {string}', (campo, valor) => {
  cadastroPage.preencherCampo(campo, valor)
})

When('o usuário deixa os campos {string}, {string} e {string} em branco', (campo1, campo2, campo3) => {
  cadastroPage.deixarCamposEmBranco(campo1, campo2, campo3)
})

When('aciona o botão {string}', (rotulo) => {
  cadastroPage.acionarBotao(rotulo)
})

When('o usuário aciona o link {string}', (texto) => {
  cadastroPage.acionarLink(texto)
})

When('o usuário acessa a tela de login', () => {
  cy.visit('/login')
})

When('informa o mesmo e-mail e a mesma senha utilizados no cadastro', () => {
  cy.get('@emailCadastro').then((email) => {
    cy.get('#email').clear().type(email)
  })
  cy.get('@senhaCadastro').then((senha) => {
    cy.get('#senha').clear().type(senha)
  })
})

When('aciona o botão de entrar', () => {
  cy.get('button[type="submit"]').click()
})

Then('o título da página deve ser {string}', (titulo) => {
  cy.title().should('eq', titulo)
})

Then('o menu deve exibir os links {string}, {string} e {string}', (link1, link2, link3) => {
  cy.contains('a', link1).should('be.visible')
  cy.contains('a', link2).should('be.visible')
  cy.contains('a', link3).should('be.visible')
})

Then('a aba {string} deve estar destacada como ativa', (texto) => {
  cy.contains('li.active', texto).should('be.visible')
})

Then('o formulário deve exibir os campos {string}, {string} e {string}', (campo1, campo2, campo3) => {
  cy.get(cadastroPage.seletorCampo(campo1)).should('be.visible')
  cy.get(cadastroPage.seletorCampo(campo2)).should('be.visible')
  cy.get(cadastroPage.seletorCampo(campo3)).should('be.visible')
})

Then('o botão {string} deve estar visível e habilitado', (rotulo) => {
  cy.get(`input[type="submit"][value="${rotulo}"]`)
    .should('be.visible')
    .and('not.be.disabled')
})

Then('o sistema deve exibir a mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible')
})

Then('deve exibir a mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible')
})

Then('o cadastro não deve ser concluído', () => {
  cy.contains('Usuário inserido com sucesso').should('not.exist')
})

Then('o sistema deve impedir o envio por formato de e-mail inválido', () => {
  cy.get('#email').then(($input) => {
    expect($input[0].checkValidity()).to.eq(false)
  })
  cy.url().should('include', '/cadastro')
})

Then('os caracteres digitados devem ser exibidos de forma mascarada', () => {
  cy.get('#senha').should('have.attr', 'type', 'password')
})

Then('o valor em texto puro não deve ficar visível na tela', () => {
  cy.get('#senha').invoke('val').then((valor) => {
    cy.get('body').should('not.contain', valor)
  })
})

Then('o sistema deve redirecionar para a rota {string}', (rota) => {
  cy.location('pathname').should('eq', rota)
})

Then('o campo {string} deve exibir o placeholder {string}', (campo, placeholder) => {
  cy.get(cadastroPage.seletorCampo(campo)).should('have.attr', 'placeholder', placeholder)
})

Then('o item de menu {string} deve permanecer visível', (texto) => {
  cy.contains('a', texto).should('be.visible')
})

Then('deve estar destacado como a opção ativa da navegação', () => {
  cy.contains('li.active', 'Novo usuário?').should('be.visible')
})

Then('o usuário deve permanecer na rota {string}', (rota) => {
  cy.url().should('include', rota)
})

Then('o acesso deve ser concedido', () => {
  cy.contains('Bem vindo').should('be.visible')
})

Then('a área logada da aplicação deve ser exibida', () => {
  cy.contains('Home').should('be.visible')
  cy.contains('Contas').should('be.visible')
  cy.contains('Sair').should('be.visible')
})

Then('as mensagens de campo obrigatório devem ser exibidas', () => {
  cy.contains('Nome é um campo obrigatório').should('be.visible')
  cy.contains('Email é um campo obrigatório').should('be.visible')
  cy.contains('Senha é um campo obrigatório').should('be.visible')
})

Then('os campos {string}, {string} e {string} devem permanecer visíveis', (campo1, campo2, campo3) => {
  cy.get(cadastroPage.seletorCampo(campo1)).should('be.visible')
  cy.get(cadastroPage.seletorCampo(campo2)).should('be.visible')
  cy.get(cadastroPage.seletorCampo(campo3)).should('be.visible')
})

Then('o botão {string} deve permanecer disponível para nova tentativa', (rotulo) => {
  cy.get(`input[type="submit"][value="${rotulo}"]`)
    .should('be.visible')
    .and('not.be.disabled')
})

Then('o rótulo do campo deve ser {string}', (rotulo) => {
  cy.contains('label', rotulo).should('be.visible')
})

Then('o placeholder do mesmo campo deve ser {string}', (placeholder) => {
  cy.get('#senha').should('have.attr', 'placeholder', placeholder)
})

Then('o botão de envio deve estar rotulado como {string}', (rotulo) => {
  cy.get(`input[type="submit"][value="${rotulo}"]`).should('be.visible')
})
