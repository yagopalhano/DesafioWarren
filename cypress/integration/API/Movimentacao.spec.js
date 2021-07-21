/// <reference types = "cypress" />

import faker from 'faker-br'
import '../../support/commandsApi'
import dayjs from 'dayjs'


describe('Testes de movimentação', () => {
    beforeEach(() => {
        global.email = faker.internet.email()
        global.todaysDate = dayjs().format('DD/MM/YYYY')
        cy.postCriarUsuario(email)
        cy.getToken(email, Cypress.env('senha'))
        cy.postCriarConta(Cypress.env('nome_conta'))
    })

    it('Validar a criação de uma movimentação', () => {
        cy.get('@response').then(res => {
            cy.postCriarMovimentacao(res.body.id, todaysDate, todaysDate,
                'Transação de testes', Cypress.env('nome'), true, 'REC',
                '1000').as('response')
        })
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('conta_id')
            expect(res.body).to.have.property('data_pagamento', dayjs()
            .format('YYYY-MM-DD')+'T03:00:00.000Z')
            expect(res.body).to.have.property('data_transacao', dayjs()
            .format('YYYY-MM-DD')+'T03:00:00.000Z')
            expect(res.body).to.have.property('descricao', 'Transação de testes')
            expect(res.body).to.have.property('envolvido', Cypress.env('nome'))
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('observacao', null)
            expect(res.body).to.have.property('parcelamento_id', null)
            expect(res.body).to.have.property('status', true)
            expect(res.body).to.have.property('tipo', 'REC')
            expect(res.body).to.have.property('transferencia_id', null)
            expect(res.body).to.have.property('usuario_id')
            expect(res.body).to.have.property('valor', "1000.00")
        })
    })

    it('Remover uma movimentação inexistente', () => {
        cy.deleteRemoverMovimentacao('error').as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(500)
            expect(res.body).to.have.property('code', '22P02')
            expect(res.body).to.have.property('file', 'numutils.c')
            expect(res.body).to.have.property('length')
            expect(res.body).to.have.property('line', '62')
            expect(res.body).to.have.property('name', 'error')
            expect(res.body).to.have.property('routine', 'pg_atoi')
            expect(res.body).to.have.property('severity', 'ERROR')
        })
    })
})