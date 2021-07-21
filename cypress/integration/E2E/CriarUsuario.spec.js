/// <reference types="cypress"/>

import faker from 'faker-br'

import loc from '../../support/locators'


describe('Testes de criação de usuário', () => {
    beforeEach(() =>{   
        cy.visitarPaginaSeuBarriga()
        global.email = faker.internet.email()
    })


    it('Realizar a criação de um usuário na aplicação com sucesso', function() {        
        cy.criarUsuario(Cypress.env('nome'), email, Cypress.env('senha'))

        cy.xpath(loc.ALERT.ALERT('Usuário inserido com sucesso'))
    })


    it('Tantar criar um usuário com dados já utilizados', function() {
        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)

        cy.criarUsuario(Cypress.env('nome'), email, Cypress.env('senha'))

        cy.xpath(loc.ALERT.ALERT('Endereço de email já utilizado'))
    })
})