/// <reference types = "cypress" />

import faker from 'faker-br'
import '../../support/commandsApi'
import dayjs from 'dayjs'


describe('Testes de saldo', () => {
    beforeEach(() => {
        global.email = faker.internet.email()
        global.todaysDate = dayjs().format('DD/MM/YYYY')
        cy.postCriarUsuario(email)
        cy.getToken(email, Cypress.env('senha'))
        cy.postCriarConta(Cypress.env('nome_conta'))
    })

    it('Validar o saldo restante em uma conta', () => {
        cy.get('@response').then(res => {
            global.contaId = res.body.id
            cy.postCriarMovimentacao(contaId, todaysDate, todaysDate,
                'Transação de testes', Cypress.env('nome'), true, 'REC',
                '1000').as('response')
            cy.postCriarMovimentacao(contaId, todaysDate, todaysDate,
                'Transação de testes', Cypress.env('nome'), true, 'REC',
                '500').as('response')
        })

        cy.getBuscarSaldo().then(res => {
            console.log(res.body)
            expect(res.status).to.be.equal(200)
            expect(res.body[0]).to.have.property('conta', 'Conta de teste')
            expect(res.body[0]).to.have.property('conta_id', contaId)
            expect(res.body[0]).to.have.property('saldo', '1500.00')
        }) 
    })


    it('Validar o saldo de uma conta vazia', () => {
        cy.getBuscarSaldo().then(res => {
            console.log(res.body)
            expect(res.status).to.be.equal(200)
            expect(res.body).to.be.empty
        }) 
    })
})
