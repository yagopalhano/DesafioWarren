/// <reference types = "cypress" />

import faker from 'faker-br'
import '../../support/commandsApi'

describe('Testes de criação de usuário', () => {
    beforeEach(() => {
        global.email = faker.internet.email()
        cy.postCriarUsuario(email)
    })

    it('Validar o funcionamento de criação de usuário', () => {

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('email', email)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', Cypress.env('nome'))
            expect(res.body).to.have.property('senha')
        })
    })

    it('Tantar criar um usuário com dados já utilizados', () => {
        cy.postCriarUsuario(email)

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(500)
            expect(res.body).to.have.property('code')
            expect(res.body).to.have.property('constraint', 'usuarios_email_unique')
            expect(res.body).to.have.property('detail', `Key (email)=(${email}) already exists.`)
            expect(res.body).to.have.property('file', 'nbtinsert.c')
            expect(res.body).to.have.property('length')
            expect(res.body).to.have.property('line', '433')
            expect(res.body).to.have.property('name', 'error')
            expect(res.body).to.have.property('routine', '_bt_check_unique')
            expect(res.body).to.have.property('schema', 'public')
            expect(res.body).to.have.property('severity', 'ERROR')
            expect(res.body).to.have.property('table', 'usuarios')
        })
    })
})