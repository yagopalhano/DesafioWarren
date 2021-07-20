/// <reference types="cypress"/>

var faker = require('faker-br')
const dayjs = require('dayjs')
require('dayjs/locale/pt-br')


import loc from '../support/locators'
import qa from '../support/environments/qa.json'

describe('Testes de movimentação', () => {
    beforeEach(() =>{   
        cy.visitarPaginaSeuBarriga()
    })

    it('Visualizar resumo do mês atual', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')
        const todaysMonth = dayjs().locale('pt-br').format('MMMM')
        const todaysYear = dayjs().format('YYYY')


        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')  

        cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
        qa.env.nome, '1000', 'Conta de testes', 'pago')
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
        const email = faker.internet.email()      
        const subtractedDate = dayjs().subtract(1, 'month').format('DD/MM/YYYY')
        const subtractedMonth = dayjs().subtract(1, 'month')
        .locale('pt-br').format('MMMM')
        const todaysYear = dayjs().format('YYYY')


        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')  

        cy.criarMovimentacao('Receita', subtractedDate, subtractedDate, 'Testes', 
        qa.env.nome, '1000', 'Conta de testes', 'pago')
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
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')
        const todaysMonth = dayjs().locale('pt-br').format('MMMM')
        const todaysYear = dayjs().format('YYYY')


        cy.postCriarUsuario(qa.env.nome, qa.env.senha, email)

        cy.login(email, qa.env.senha)
        cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

        cy.postCriarConta('Conta de testes')  

        cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
        qa.env.nome, '1000', 'Conta de testes', 'pago')
        cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

        cy.get(loc.HOME.RESUMO_MENSAL).should('be.visible').click()

        cy.get(loc.RESUMO_MENSAL.DROPDOWN_MES).should('be.visible').select(todaysMonth)
        cy.get(loc.RESUMO_MENSAL.DROPDOWN_ANO).should('be.visible').select(todaysYear)
        cy.get(loc.RESUMO_MENSAL.BTN_BUSCAR).should('be.visible').click()

        cy.get(loc.RESUMO_MENSAL.BTN_APAGAR).should('be.visible').click()
        cy.xpath(loc.ALERT.ALERT('Movimentação removida com sucesso!'))

    })


})
