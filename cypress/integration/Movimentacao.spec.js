/// <reference types="cypress"/>

var faker = require('faker-br')
const dayjs = require('dayjs')

import loc from '../support/locators'

describe('Testes de movimentação', () => {
    beforeEach(() =>{   
        cy.visit('https://seubarriga.wcaquino.me/')
        cy.title().should('be.equal', 'Seu Barriga - Log in')
    })

    it('Criar uma movimentação de receita já paga', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')

        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)

            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

            cy.postCriarConta('Conta de testes')    
            
            cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
            this.usuario.nome, '1000', 'Conta de testes', 'pago')
            cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

        })
    })

    it('Criar uma movimentação de receita pendente', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')

        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)

            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

            cy.postCriarConta('Conta de testes')    
            
            cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
            this.usuario.nome, '1000', 'Conta de testes', 'pendente')
            cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))
        })
    })

    it('Criar uma movimentação de despesa pendente', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')

        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)

            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

            cy.postCriarConta('Conta de testes')    

            cy.criarMovimentacao('Despesa', todaysDate, todaysDate, 'Testes', 
            this.usuario.nome, '1000', 'Conta de testes', 'pendente')
            cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))        
        })
    })

    it('Criar uma movimentação de despesa já paga', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')
    
        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)
    
            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))
    
            cy.postCriarConta('Conta de testes')    

            cy.criarMovimentacao('Despesa', todaysDate, todaysDate, 'Testes', 
            this.usuario.nome, '1000', 'Conta de testes', 'pago')
            cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))
        })
    })

    it('Tentar criar uma movimentação futura', function() {
        const email = faker.internet.email()      
        const addDate = dayjs().add(1, 'month').format('DD/MM/YYYY')

        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)

            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

            cy.postCriarConta('Conta de testes')  

            cy.criarMovimentacao('Receita', addDate, addDate, 'Testes', 
            this.usuario.nome, '1000', 'Conta de testes', 'pago')

            cy.xpath(loc.ALERT.ALERT('Data da Movimentação deve ser menor ou igual à data atual'))
        })
    })
})
