
import loc from './locators'
const dayjs = require('dayjs')


Cypress.Commands.add('login', (email, senha) => { 
    cy.get(loc.LOGIN.EMAIL).should('be.visible').type(email.toString())
    cy.get(loc.LOGIN.SENHA).should('be.visible').type(senha)
    cy.get(loc.LOGIN.BTN_ENTRAR).should('be.visible').click()
 })


Cypress.Commands.add('visitarPaginaSeuBarriga', () => {
    cy.visit('/')
    cy.title().should('be.equal', 'Seu Barriga - Log in')
})

Cypress.Commands.add('criarUsuario', (nome, email, senha) => { 
    cy.get(loc.CRIAR_USUARIO.BTN_NOVO_USUARIO).should('be.visible').click()
    cy.get(loc.CRIAR_USUARIO.NOME).should('be.enabled').type(nome)
    cy.get(loc.CRIAR_USUARIO.EMAIL).should('be.enabled').type(email)
    cy.get(loc.CRIAR_USUARIO.SENHA).should('be.enabled').type(senha)
    cy.get(loc.CRIAR_USUARIO.BTN_CADASTRAR).should('be.visible').click()
 })

Cypress.Commands.add('criarMovimentacao', (tipo_movimentacao, data_transacao, 
    data_pagamento, descricao, interessado, valor, conta, situacao) => {
        if (situacao === 'pago'){
            situacao = loc.MOVIMENTACAO.SITUACAO_PAGO
        }else{
            situacao = loc.MOVIMENTACAO.SITUACAO_PENDENTE
        }

        cy.get(loc.HOME.CRIAR_MOVIMENTACAO).should('be.visible').click()      
        cy.get(loc.MOVIMENTACAO.TIPO_MOVIMENTACAO).should('be.visible').select(tipo_movimentacao)
        cy.get(loc.MOVIMENTACAO.DATA_TRANSACAO).should('be.enabled').type(data_transacao)    
        cy.get(loc.MOVIMENTACAO.DATA_PAGAMENTO).should('be.enabled').type(data_pagamento)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('be.enabled').type(descricao)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).should('be.enabled').type(interessado)
        cy.get(loc.MOVIMENTACAO.VALOR).should('be.enabled').type(valor)
        cy.get(loc.MOVIMENTACAO.CONTA).should('be.visible').select(conta)
        cy.get(situacao).should('be.visible').click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).should('be.visible').click()
    })

 Cypress.Commands.add('postCriarUsuario', (nome, senha, email) => {
    cy.request({
        method: 'POST',
        url: '/cadastrarUsuario',
        body: {
            nome: nome,
            senha: senha,
            email: email,
            redirecionar: false
        }
    }).its('status').should('be.equal', 200)
})


Cypress.Commands.add('postCriarConta', (nome) => {
    cy.request({
        method: 'POST',
        url: '/salvarConta',
        body: {
            nome: nome,
            redirecionar: false
        }
    }).its('status').should('be.equal', 200)
})

