/// <reference types = "cypress" />

import faker from 'faker-br'
import '../../support/commandsApi'

describe('Testes de login', () => {
    beforeEach(() => {
        global.email = faker.internet.email()
        cy.postCriarUsuario(email)
    })

    it('Validar o funcionamento da API de login com dados válidos', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config().apiUrl}/signin`,
            body: {
                email: email,
                redirecionar: false,
                senha: Cypress.env('senha')
            }
        }).as('response')
        
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('token')
        })
    })

    it('Validar o funcionamento da API de login com dados inválidos', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config().apiUrl}/signin`,
            body: {
                email: email,
                redirecionar: false,
                senha: Cypress.env('senhaIncorreta')
            },
            failOnStatusCode: false
        }).as('response')
        
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(401)
            expect(res.statusText).to.be.equal('Unauthorized')
        })
    })
})