/// <reference types="cypress"/>

var faker = require('faker-br');

import loc from '../support/locators'
import qa from '../support/environments/qa.json'

describe('Testes de contas', () => {
    beforeEach(() =>{   
        cy.visitarPaginaSeuBarriga()
    })

    it('Criar uma conta na aplicação com sucesso', function() {
        const email = faker.internet.email()

        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))
        
        cy.get(loc.HOME.CONTAS).should('be.visible').click()
        cy.get(loc.HOME.ADICIONAR_CONTAS).should('be.visible').click()
        cy.get(loc.CONTAS.NOME).should('be.enabled').type('Conta de testes')
        cy.get(loc.CONTAS.BTN_SALVAR).should('be.visible').click()
        cy.xpath(loc.ALERT.ALERT('Conta adicionada com sucesso!'))
        cy.xpath(loc.CONTAS.TABELA_CONTAS('Conta de testes'))

    })

    it('Tentar criar uma conta com o mesmo nome de uma existente', function() {
        const email = faker.internet.email()

        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)
        
        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')
        cy.get(loc.HOME.CONTAS).should('be.visible').click()
        cy.get(loc.HOME.ADICIONAR_CONTAS).should('be.visible').click()
        cy.get(loc.CONTAS.NOME).should('be.enabled').type('Conta de testes')
        cy.get(loc.CONTAS.BTN_SALVAR).should('be.visible').click()
        cy.xpath(loc.ALERT.ALERT('Já existe uma conta com esse nome!'))

    })

    it('Listar uma conta na aplicação com sucesso', function() {
        const email = faker.internet.email()

        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)
        
        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))
        
        cy.postCriarConta('Conta de testes')
        cy.get(loc.HOME.CONTAS).should('be.visible').click()
        cy.get(loc.HOME.LISTAR_CONTAS).should('be.visible').click()
        cy.xpath(loc.CONTAS.TABELA_CONTAS('Conta de testes'))

    })
})