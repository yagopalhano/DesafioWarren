const locators = {
    CRIAR_USUARIO: {
        BTN_NOVO_USUARIO: ':nth-child(2) > a',
        NOME: '#nome',
        EMAIL: '#email',
        SENHA: '#senha',
        BTN_CADASTRAR: '.btn'
    },
    LOGIN: {
        EMAIL: '#email',
        SENHA: '#senha',
        BTN_ENTRAR: '.btn'
    },
    HOME: {
        HOME: '.nav > :nth-child(1) > a',
        CONTAS: '.dropdown-toggle',
        ADICIONAR_CONTAS: '.dropdown-menu > :nth-child(1) > a',
        LISTAR_CONTAS: '.dropdown-menu > :nth-child(2) > a',
        CRIAR_MOVIMENTACAO: ':nth-child(3) > a',
        RESUMO_MENSAL: ':nth-child(4) > a',
        SAIR: ':nth-child(5) > a'
    },
    ALERT: {
        ALERT: menssagem => `//div[contains(.,'${menssagem}')]`
    },
    CONTAS: {
        NOME: '#nome',
        BTN_SALVAR: '.btn',
        TABELA_CONTAS: conta => `//*[@id="tabelaContas"][contains(.,'${conta}')]`
    },
    MOVIMENTACAO: {
        TIPO_MOVIMENTACAO: '#tipo',
        DATA_TRANSACAO: '#data_transacao',
        DATA_PAGAMENTO: '#data_pagamento',
        DESCRICAO: '#descricao',
        INTERESSADO: '#interessado',
        VALOR: '#valor',
        CONTA: '#conta',
        SITUACAO_PAGO: '#status_pago',
        SITUACAO_PENDENTE: '#status_pendente',
        BTN_SALVAR: '.btn'
    },
    RESUMO_MENSAL: {
        DROPDOWN_MES: '#mes',
        DROPDOWN_ANO: '#ano',
        BTN_BUSCAR: '.btn',
        BTN_APAGAR: '.glyphicon',
        CAMPO_DESCRICAO: descricao => `//*[@id="tabelaExtrato"]/tbody/tr/td[1][contains(.,'${descricao}')]`,
        CAMPO_DT_PAGAMENTO: dt_pagamento => `//*[@id="tabelaExtrato"]/tbody/tr/td[2][contains(.,'${dt_pagamento}')]`,
        CAMPO_CONTA: conta => `//*[@id="tabelaExtrato"]/tbody/tr/td[3][contains(.,'${conta}')]`,
        CAMPO_VALOR: valor => `//*[@id="tabelaExtrato"]/tbody/tr/td[4][contains(.,'${valor}')]`,
        CAMPO_SITUACAO: situacao => `//*[@id="tabelaExtrato"]/tbody/tr/td[5][contains(.,'${situacao}')]`,

    }
}

export default locators;