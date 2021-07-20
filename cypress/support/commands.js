
import loc from './locators'
const dayjs = require('dayjs')


Cypress.Commands.add('login', (email, password) => { 
    cy.get(loc.LOGIN.EMAIL).type(email.toString())
    cy.get(loc.LOGIN.SENHA).type(password)
    cy.get(loc.LOGIN.BTN_ENTRAR).click()
 })


Cypress.Commands.add('criarMovimentacao', (tipo_movimentacao, data_transacao, 
    data_pagamento, descricao, interessado, valor, conta, situacao) => {
        if (situacao === 'pago'){
            situacao = loc.MOVIMENTACAO.SITUACAO_PAGO
        }else{
            situacao = loc.MOVIMENTACAO.SITUACAO_PENDENTE
        }

        cy.get(loc.HOME.CRIAR_MOVIMENTACAO).click()      
        cy.get(loc.MOVIMENTACAO.TIPO_MOVIMENTACAO).select(tipo_movimentacao)
        cy.get(loc.MOVIMENTACAO.DATA_TRANSACAO).type(data_transacao)    
        cy.get(loc.MOVIMENTACAO.DATA_PAGAMENTO).type(data_pagamento)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type(descricao)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type(interessado)
        cy.get(loc.MOVIMENTACAO.VALOR).type(valor)
        cy.get(loc.MOVIMENTACAO.CONTA).select(conta)
        cy.get(situacao).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
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

