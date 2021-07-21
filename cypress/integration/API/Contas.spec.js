/// <reference types = "cypress" />

import faker from 'faker-br'
import '../../support/commandsApi'

describe('Testes de contas', () => {
    beforeEach(() => {
        global.email = faker.internet.email()
        cy.postCriarUsuario(email)
        cy.getToken(email, Cypress.env('senha'))
    })

    it('Validar o funcionamento de criação de uma conta', () => {
        cy.postCriarConta(Cypress.env('nome_conta'))

        cy.get('@response').then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('nome', Cypress.env('nome_conta'))
        expect(res.body).to.have.property('usuario_id')
        expect(res.body).to.have.property('visivel', true)
        })
    })

    it('Validar o funcionamento de criação de uma conta com o mesmo nome', () => {
        cy.postCriarConta(Cypress.env('nome_conta')).then(() => {
            cy.postCriarConta(Cypress.env('nome_conta'))
            .as('response')
        })

        cy.get('@response').then(res => {
        expect(res.status).to.be.equal(400)
        expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
        })
    })

    it('Validar a alteração do nome de uma conta', () => {
        cy.postCriarConta(Cypress.env('nome_conta'))

        cy.get('@response').then(res => {
            cy.putAlterarConta(res.body.id, 'Conta alterada').as('response')
        
        })
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta alterada')
            expect(res.body).to.have.property('usuario_id')
            expect(res.body).to.have.property('visivel', true)
        })
    })

    it('Validar a alteração do nome de uma conta inexistente', () => {
        cy.putAlterarConta('error', 'Conta alterada').as('response')
        
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