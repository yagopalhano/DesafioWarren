/// <reference types="cypress"/>

var faker = require('faker-br')
const dayjs = require('dayjs')

import loc from '../../support/locators'


describe('Testes de movimentação', () => {
    beforeEach(() =>{   
        cy.visitarPaginaSeuBarriga()
        global.email = faker.internet.email() 
    })

    it('Criar uma movimentação de receita já paga', function() {             
        const todaysDate = dayjs().format('DD/MM/YYYY')

        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)

        cy.login(email, Cypress.env('senha'))
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')    
        
        cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
        Cypress.env('nome'), '1000', 'Conta de testes', 'pago')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

    })

    it('Criar uma movimentação de receita pendente', function() {    
        const todaysDate = dayjs().format('DD/MM/YYYY')


        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)

        cy.login(email, Cypress.env('senha'))
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')    
        
        cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
        Cypress.env('nome'), '1000', 'Conta de testes', 'pendente')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))
    })

    it('Criar uma movimentação de despesa pendente', function() {    
        const todaysDate = dayjs().format('DD/MM/YYYY')

        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)

        cy.login(email, Cypress.env('senha'))
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')    

        cy.criarMovimentacao('Despesa', todaysDate, todaysDate, 'Testes', 
        Cypress.env('nome'), '1000', 'Conta de testes', 'pendente')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))        
    })

    it('Criar uma movimentação de despesa já paga', function() {    
        const todaysDate = dayjs().format('DD/MM/YYYY')  

        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)

        cy.login(email, Cypress.env('senha'))
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')    

        cy.criarMovimentacao('Despesa', todaysDate, todaysDate, 'Testes', 
        Cypress.env('nome'), '1000', 'Conta de testes', 'pago')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))
    })

    it('Tentar criar uma movimentação futura', function() {  
        const addDate = dayjs().add(1, 'month').format('DD/MM/YYYY')

        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)

        cy.login(email, Cypress.env('senha'))
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')  

        cy.criarMovimentacao('Receita', addDate, addDate, 'Testes', 
        Cypress.env('nome'), '1000', 'Conta de testes', 'pago')

        cy.xpath(loc.ALERT.ALERT('Data da Movimentação deve ser menor ou igual à data atual'))
    })
})
