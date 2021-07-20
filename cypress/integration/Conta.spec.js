/// <reference types="cypress"/>

var faker = require('faker-br');

import loc from '../support/locators'

describe('Testes de contas', () => {
    beforeEach(() =>{   
        cy.visit('https://seubarriga.wcaquino.me/')
        cy.title().should('be.equal', 'Seu Barriga - Log in')
    })

    it('Criar uma conta na aplicação com sucesso', function() {
        const email = faker.internet.email()
        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)
            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))
            cy.get(loc.HOME.CONTAS).click()
            cy.get(loc.HOME.ADICIONAR_CONTAS).click()
            cy.get(loc.CONTAS.NOME).type('Conta de testes')
            cy.get(loc.CONTAS.BTN_SALVAR).click()
            cy.xpath(loc.ALERT.ALERT('Conta adicionada com sucesso!'))
            cy.xpath(loc.CONTAS.TABELA_CONTAS('Conta de testes'))
        })
    })

    it('Tentar criar uma conta com o mesmo nome de uma existente', function() {
        const email = faker.internet.email()
        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)
            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))
            cy.postCriarConta('Conta de testes')
            cy.get(loc.HOME.CONTAS).click()
            cy.get(loc.HOME.ADICIONAR_CONTAS).click()
            cy.get(loc.CONTAS.NOME).type('Conta de testes')
            cy.get(loc.CONTAS.BTN_SALVAR).click()
            cy.xpath(loc.ALERT.ALERT('Já existe uma conta com esse nome!'))
        })
    })

    it('Listar uma conta na aplicação com sucesso', function() {
        const email = faker.internet.email()
        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)
            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))
            cy.postCriarConta('Conta de testes')
            cy.get(loc.HOME.CONTAS).click()
            cy.get(loc.HOME.LISTAR_CONTAS).click()
            cy.xpath(loc.CONTAS.TABELA_CONTAS('Conta de testes'))
        })
    })
})