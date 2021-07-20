/// <reference types="cypress"/>

var faker = require('faker-br');

import loc from '../support/locators'
import qa from '../support/environments/qa.json'

describe('Testes de criação de usuário', () => {
    beforeEach(() =>{   
        cy.visitarPaginaSeuBarriga()
    })


    it('Realizar a criação de um usuário na aplicação com sucesso', function() {
        const email = faker.internet.email()

        cy.criarUsuario(qa.env.nome, email, qa.env.senha)

        cy.xpath(loc.ALERT.ALERT('Usuário inserido com sucesso'))
    })


    it('Tantar criar um usuário com dados já utilizados', function() {
        const email = faker.internet.email()

        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.criarUsuario(qa.env.nome, email, qa.env.senha)

        cy.xpath(loc.ALERT.ALERT('Endereço de email já utilizado'))
    })
})