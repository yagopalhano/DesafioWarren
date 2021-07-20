/// <reference types="cypress"/>

var faker = require('faker-br');

import loc from '../support/locators'

describe('Testes de login', () => {
    beforeEach(() =>{   
        cy.visit('https://seubarriga.wcaquino.me/')
        cy.title().should('be.equal', 'Seu Barriga - Log in')
    })

    it('Realizar login na aplicação com sucesso', function() {
        const email = faker.internet.email()
        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)
            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))
            
        })
    })

    it('Tentar realizar login na aplicação com dados incorretos', function() {
        const email = faker.internet.email()
        cy.fixture('userData').as('usuario').then(() => {
            cy.login(email, this.usuario.senhaIncorreta)
            cy.xpath(loc.ALERT.ALERT('Problemas com o login do usuário'))
        })
    })

    it('Tentar realizar login na aplicação sem informar os dados', function() {
        cy.get(loc.LOGIN.BTN_ENTRAR).click()
        cy.xpath(loc.ALERT.ALERT('Email é um campo obrigatório'))
        cy.xpath(loc.ALERT.ALERT('Senha é um campo obrigatório'))
    })


})