/// <reference types="cypress"/>

var faker = require('faker-br')
const dayjs = require('dayjs')

import loc from '../support/locators'
import qa from '../support/environments/qa.json'

describe('Testes de movimentação', () => {
    beforeEach(() =>{   
        cy.visitarPaginaSeuBarriga()
    })

    it('Criar uma movimentação de receita já paga', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')

        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')    
        
        cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
        qa.env.nome, '1000', 'Conta de testes', 'pago')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

    })

    it('Criar uma movimentação de receita pendente', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')


        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')    
        
        cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
        qa.env.nome, '1000', 'Conta de testes', 'pendente')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))
    })

    it('Criar uma movimentação de despesa pendente', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')

        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')    

        cy.criarMovimentacao('Despesa', todaysDate, todaysDate, 'Testes', 
        qa.env.nome, '1000', 'Conta de testes', 'pendente')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))        
    })

    it('Criar uma movimentação de despesa já paga', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')  

        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')    

        cy.criarMovimentacao('Despesa', todaysDate, todaysDate, 'Testes', 
        qa.env.nome, '1000', 'Conta de testes', 'pago')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))
    })

    it('Tentar criar uma movimentação futura', function() {
        const email = faker.internet.email()      
        const addDate = dayjs().add(1, 'month').format('DD/MM/YYYY')

        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')  

        cy.criarMovimentacao('Receita', addDate, addDate, 'Testes', 
        qa.env.nome, '1000', 'Conta de testes', 'pago')

        cy.xpath(loc.ALERT.ALERT('Data da Movimentação deve ser menor ou igual à data atual'))
    })
})
