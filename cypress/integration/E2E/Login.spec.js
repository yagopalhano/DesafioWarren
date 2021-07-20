/// <reference types="cypress"/>

var faker = require('faker-br');

import loc from '../../support/locators'


describe('Testes de login', () => {
    beforeEach(() =>{   
        cy.visitarPaginaSeuBarriga()
        global.email = faker.internet.email()
    })

    it('Realizar login na aplicação com sucesso', function() {
        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)
        cy.login(email, Cypress.env('senha'))
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))
    })

    it('Tentar realizar login na aplicação com dados incorretos', function() {
        cy.login(email, Cypress.env('senhaIncorreta'))
        cy.xpath(loc.ALERT.ALERT('Problemas com o login do usuário'))

    })

    it('Tentar realizar login na aplicação sem informar os dados', function() {
        cy.get(loc.LOGIN.BTN_ENTRAR).should('be.visible').click()
        cy.xpath(loc.ALERT.ALERT('Email é um campo obrigatório'))
        cy.xpath(loc.ALERT.ALERT('Senha é um campo obrigatório'))
    })


})