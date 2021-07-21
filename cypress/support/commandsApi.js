
Cypress.Commands.add('postCriarUsuario', (email) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.config().apiUrl}/usuarios`,
        body: {
            email: email,
            nome: Cypress.env('nome'),
            redirecionar: false,
            senha: Cypress.env('senha')
        },
        failOnStatusCode: false
    }).as('response').then(res => {
        return res
    })
})

Cypress.Commands.add('postCriarConta', (nome) => {
    cy.request({
        url: `${Cypress.config().apiUrl}/contas`,
        method: 'POST',
        body: {
            nome: nome
        },
        failOnStatusCode: false
    }).as('response')
})

Cypress.Commands.add('postCriarMovimentacao', (conta_id, dt_pagamento, dt_transacao,
    descricao, envolvido, status, tipo, valor) => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config().apiUrl}/transacoes`,
            body: {
                conta_id: conta_id,
                data_pagamento: dt_pagamento,
                data_transacao: dt_transacao,
                descricao: descricao,
                envolvido: envolvido,
                status: status,
                tipo: tipo,
                valor: valor
            },
            failOnStatusCode: false
        }).as('response')
})

Cypress.Commands.add('deleteRemoverMovimentacao', (trasacaoId) => {
    cy.request({
        url: `${Cypress.config().apiUrl}/transacoes/${trasacaoId}`,
        method: 'DELETE',
        failOnStatusCode: false
    }).as('response')
})

Cypress.Commands.add('getBuscarSaldo', () => {
    cy.request({
        url: `${Cypress.config().apiUrl}/saldo`,
        method: 'GET',
        failOnStatusCode: false
    }).as('response')
})


Cypress.Commands.add('putAlterarConta', (contaId, nome) => {
    cy.request({
        url: `${Cypress.config().apiUrl}/contas/${contaId}`,
        method: 'PUT',
        body: {
            nome: nome
        },
        failOnStatusCode: false
    }).as('response')
})

Cypress.Commands.add('getToken', (email, senha) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.config().apiUrl}/signin`,
        body: {
            email: email,
            redirecionar: false,
            senha: senha
        },
        failOnStatusCode: false
    }).its('body.token').should('not.be.empty')
        .then(token => {
            Cypress.env('token', token)
            return token
        })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if (options.length === 1) {
        if (Cypress.env('token')) {
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
            }
        }
    }

    return originalFn(...options)
})