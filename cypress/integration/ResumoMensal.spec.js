/// <reference types="cypress"/>

var faker = require('faker-br')
const dayjs = require('dayjs')
require('dayjs/locale/pt-br')


import { locale } from 'dayjs'
import loc from '../support/locators'

describe('Testes de movimentação', () => {
    beforeEach(() =>{   
        cy.visit('https://seubarriga.wcaquino.me/')
        cy.title().should('be.equal', 'Seu Barriga - Log in')
    })

    it('Visualizar resumo do mês atual', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')
        const todaysMonth = dayjs().locale('pt-br').format('MMMM')
        const todaysYear = dayjs().format('YYYY')

        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)

            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

            cy.postCriarConta('Conta de testes')  

            cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
            this.usuario.nome, '1000', 'Conta de testes', 'pago')
            cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

            cy.get(loc.HOME.RESUMO_MENSAL).click()

            cy.get(loc.RESUMO_MENSAL.DROPDOWN_MES).select(todaysMonth)
            cy.get(loc.RESUMO_MENSAL.DROPDOWN_ANO).select(todaysYear)
            cy.get(loc.RESUMO_MENSAL.BTN_BUSCAR).click()

            cy.xpath(loc.RESUMO_MENSAL.CAMPO_DESCRICAO('Teste'))
            cy.xpath(loc.RESUMO_MENSAL.CAMPO_DT_PAGAMENTO(todaysDate))
            cy.xpath(loc.RESUMO_MENSAL.CAMPO_CONTA('Conta de testes'))
            cy.xpath(loc.RESUMO_MENSAL.CAMPO_VALOR('1000.00'))
            cy.xpath(loc.RESUMO_MENSAL.CAMPO_SITUACAO('Pago'))
        })
    })

    it('Visualizar resumo do mês anterior', function() {
        const email = faker.internet.email()      
        const subtractedDate = dayjs().subtract(1, 'month').format('DD/MM/YYYY')
        const subtractedMonth = dayjs().subtract(1, 'month')
        .locale('pt-br').format('MMMM')
        const todaysYear = dayjs().format('YYYY')

        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)

            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

            cy.postCriarConta('Conta de testes')  

            cy.criarMovimentacao('Receita', subtractedDate, subtractedDate, 'Testes', 
            this.usuario.nome, '1000', 'Conta de testes', 'pago')
            cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

            cy.get(loc.HOME.RESUMO_MENSAL).click()

            cy.get(loc.RESUMO_MENSAL.DROPDOWN_MES).select(subtractedMonth)
            cy.get(loc.RESUMO_MENSAL.DROPDOWN_ANO).select(todaysYear)
            cy.get(loc.RESUMO_MENSAL.BTN_BUSCAR).click()

            cy.xpath(loc.RESUMO_MENSAL.CAMPO_DESCRICAO('Teste'))
            cy.xpath(loc.RESUMO_MENSAL.CAMPO_DT_PAGAMENTO(subtractedDate))
            cy.xpath(loc.RESUMO_MENSAL.CAMPO_CONTA('Conta de testes'))
            cy.xpath(loc.RESUMO_MENSAL.CAMPO_VALOR('1000.00'))
            cy.xpath(loc.RESUMO_MENSAL.CAMPO_SITUACAO('Pago'))
        })
    })

    it('Apagar conta do resumo mensal', function() {
        const email = faker.internet.email()      
        const todaysDate = dayjs().format('DD/MM/YYYY')
        const todaysMonth = dayjs().locale('pt-br').format('MMMM')
        const todaysYear = dayjs().format('YYYY')

        cy.fixture('userData').as('usuario').then(() => {
            cy.postCriarUsuario(this.usuario.nome, this.usuario.senha, email)

            cy.login(email, this.usuario.senha)
            cy.xpath(loc.ALERT.ALERT('Bem vindo, Usuário de testes'))

            cy.postCriarConta('Conta de testes')  

            cy.criarMovimentacao('Receita', todaysDate, todaysDate, 'Testes', 
            this.usuario.nome, '1000', 'Conta de testes', 'pago')
            cy.xpath(loc.ALERT.ALERT('Movimentação adicionada com sucesso!'))

            cy.get(loc.HOME.RESUMO_MENSAL).click()

            cy.get(loc.RESUMO_MENSAL.DROPDOWN_MES).select(todaysMonth)
            cy.get(loc.RESUMO_MENSAL.DROPDOWN_ANO).select(todaysYear)
            cy.get(loc.RESUMO_MENSAL.BTN_BUSCAR).click()

            cy.get(loc.RESUMO_MENSAL.BTN_APAGAR).click()
            cy.xpath(loc.ALERT.ALERT('Movimentação removida com sucesso!'))
        })
    })


})
