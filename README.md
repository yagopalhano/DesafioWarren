<h1 align="center">
  Testes E2E e API com Cypress
</h1>

<h3 align="left">Pré-requisitos</h3>

<li>Instale o Node.js: https://nodejs.org/en/download/ </li>
<li>Após instalar, execute o comando abaixo na pasta do projeto:</li>
<p align="justify">
  <pre>npm install</pre>
</p>
<hr>

<h3 align="left">Comandos para executar os testes</h3>
<h4 align="left">Testes E2E</h4>

<p align="justify">
  <pre>npm run regression-test:e2e:qa</pre>
</p>

<h4 align="left">Testes API</h4>

<p align="justify">
  <pre>npm run regression-test:api:qa</pre>
</p>

<h4 align="left">Todos os testes</h4>

<p align="justify">
  <pre>npm run regression-test:full:qa</pre>
</p>
<hr>

<h3 align="left">Estrutura do projeto</h3>

```
DesafioWarren
├─ .git
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           └─ HEAD
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-945caaec7ab88844994756062e2ed442ff8ac796.idx
│  │     └─ pack-945caaec7ab88844994756062e2ed442ff8ac796.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ cypress
│  ├─ integration
│  │  ├─ API
│  │  │  ├─ Contas.spec.js
│  │  │  ├─ CriarUsuario.spec.js
│  │  │  ├─ Login.spec.js
│  │  │  ├─ Movimentacao.spec.js
│  │  │  └─ Saldo.js
│  │  └─ E2E
│  │     ├─ Conta.spec.js
│  │     ├─ CriarUsuario.spec.js
│  │     ├─ Login.spec.js
│  │     ├─ Movimentacao.spec.js
│  │     └─ ResumoMensal.spec.js
│  ├─ plugins
│  │  └─ index.js
│  └─ support
│     ├─ commands.js
│     ├─ commandsApi.js
│     ├─ environments
│     │  └─ qa.json
│     ├─ index.js
│     └─ locators.js
├─ cypress.json
├─ package-lock.json
├─ package.json
└─ README.md

```
