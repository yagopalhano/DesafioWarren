/// <reference types="cypress"/>

var faker = require('faker-br')
const dayjs = require('dayjs')
require('dayjs/locale/pt-br')


import loc from '../support/locators'


describe('Testes de movimentação', () => {
    beforeEach(() =>{   
        cy.visitarPaginaSeuBarriga()
        global.email = faker.internet.email()   
    })

    it('Visualizar resumo do mês atual', function() {     
        const todaysDate = dayjs().format('DD/MM/YYYY')
        const todaysMonth = dayjs().locale('pt-br').format('MMMM')
        const todaysYear = dayjs().format('YYYY')


        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)

        cy.login(email, Cypress.env('senha'))
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')  

        cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
        Cypress.env('nome'), '1000', 'Conta de testes', 'pago')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

        cy.get(loc.HOME.RESUMO_MENSAL).should('be.visible').click()

        cy.get(loc.RESUMO_MENSAL.DROPDOWN_MES).should('be.visible').select(todaysMonth)
        cy.get(loc.RESUMO_MENSAL.DROPDOWN_ANO).should('be.visible').select(todaysYear)
        cy.get(loc.RESUMO_MENSAL.BTN_BUSCAR).should('be.visible').click()

        cy.xpath(loc.RESUMO_MENSAL.CAMPO_DESCRICAO('Teste'))
        cy.xpath(loc.RESUMO_MENSAL.CAMPO_DT_PAGAMENTO(todaysDate))
        cy.xpath(loc.RESUMO_MENSAL.CAMPO_CONTA('Conta de testes'))
        cy.xpath(loc.RESUMO_MENSAL.CAMPO_VALOR('1000.00'))
        cy.xpath(loc.RESUMO_MENSAL.CAMPO_SITUACAO('Pago'))
    })
    

    it('Visualizar resumo do mês anterior', function() {     
        const subtractedDate = dayjs().subtract(1, 'month').format('DD/MM/YYYY')
        const subtractedMonth = dayjs().subtract(1, 'month')
        .locale('pt-br').format('MMMM')
        const todaysYear = dayjs().format('YYYY')


        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)

        cy.login(email, Cypress.env('senha'))
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')  

        cy.criarMovimentacao('Receita', subtractedDate, subtractedDate, 'Testes', 
        Cypress.env('nome'), '1000', 'Conta de testes', 'pago')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

        cy.get(loc.HOME.RESUMO_MENSAL).should('be.visible').click()

        cy.get(loc.RESUMO_MENSAL.DROPDOWN_MES).should('be.visible').select(subtractedMonth)
        cy.get(loc.RESUMO_MENSAL.DROPDOWN_ANO).should('be.visible').select(todaysYear)
        cy.get(loc.RESUMO_MENSAL.BTN_BUSCAR).should('be.visible').click()

        cy.xpath(loc.RESUMO_MENSAL.CAMPO_DESCRICAO('Teste'))
        cy.xpath(loc.RESUMO_MENSAL.CAMPO_DT_PAGAMENTO(subtractedDate))
        cy.xpath(loc.RESUMO_MENSAL.CAMPO_CONTA('Conta de testes'))
        cy.xpath(loc.RESUMO_MENSAL.CAMPO_VALOR('1000.00'))
        cy.xpath(loc.RESUMO_MENSAL.CAMPO_SITUACAO('Pago'))
    })


    it('Apagar conta do resumo mensal', function() {     
        const todaysDate = dayjs().format('DD/MM/YYYY')
        const todaysMonth = dayjs().locale('pt-br').format('MMMM')
        const todaysYear = dayjs().format('YYYY')


        cy.postCriarUsuario(Cypress.env('nome'), Cypress.env('senha'), email)

        cy.login(email, Cypress.env('senha'))
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')  

        cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
        Cypress.env('nome'), '1000', 'Conta de testes', 'pago')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

        cy.get(loc.HOME.RESUMO_MENSAL).should('be.visible').click()

        cy.get(loc.RESUMO_MENSAL.DROPDOWN_MES).should('be.visible').select(todaysMonth)
        cy.get(loc.RESUMO_MENSAL.DROPDOWN_ANO).should('be.visible').select(todaysYear)
        cy.get(loc.RESUMO_MENSAL.BTN_BUSCAR).should('be.visible').click()

        cy.get(loc.RESUMO_MENSAL.BTN_APAGAR).should('be.visible').click()
        cy.xpath(loc.ALERT.ALERT('Movimentação removida com sucesso!'))

    })


})
