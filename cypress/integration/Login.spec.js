/// <reference types="cypress"/>

var faker = require('faker-br');

import loc from '../support/locators'
import qa from '../support/environments/qa.json'

describe('Testes de login', () => {
    beforeEach(() =>{   
        cy.visitarPaginaSeuBarriga()
    })

    it('Realizar login na aplicação com sucesso', function() {
        const email = faker.internet.email()

        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)
        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))
    })

    it('Tentar realizar login na aplicação com dados incorretos', function() {
        const email = faker.internet.email()

        cy.login(email, qa.env.senhaIncorreta)
        cy.xpath(loc.ALERT.ALERT('Problemas com o login do usuário'))

    })

    it('Tentar realizar login na aplicação sem informar os dados', function() {
        cy.get(loc.LOGIN.BTN_ENTRAR).should('be.visible').click()
        cy.xpath(loc.ALERT.ALERT('Email é um campo obrigatório'))
        cy.xpath(loc.ALERT.ALERT('Senha é um campo obrigatório'))
    })


})