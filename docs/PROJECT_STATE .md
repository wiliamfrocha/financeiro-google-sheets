PROJECT_STATE — SISTEMA DE CONTROLE FINANCEIRO

Status geral: até FASE 2.2 (backend estável e versionamento ativo)
Última atualização: hoje
Repositório: GitHub configurado e sincronizado

---

1. VISÃO GERAL DO PROJETO

Nome: Sistema Financeiro Pessoal (Google Sheets + Apps Script)

Objetivo:
Criar um sistema de controle financeiro pessoal utilizando Google Sheets como banco de dados, Google Apps Script como backend e HTML, CSS e JavaScript como frontend executado via Sidebar do Google Sheets. O sistema permite registrar entradas e gastos, suporta parcelamento, contas financeiras e gera movimentações financeiras reais por conta, seguindo regras de negócio bem definidas.

Finalidade do projeto:

* Uso real no dia a dia
* Projeto válido para portfólio
* Base evolutiva para dashboards, controle de saldo, faturas e relatórios

---

2. STACK TECNOLÓGICA

Backend:

* Google Apps Script
* Linguagem: JavaScript

Responsabilidades do backend:

* Validação de dados
* Aplicação das regras de negócio
* Geração de parcelas
* Persistência dos dados
* Registro das movimentações financeiras
* Derivação de informações de conta (nome e tipo)

Frontend (UI):

* HTML, CSS e JavaScript
* Executado via Sidebar do Google Sheets

Responsabilidades do frontend:

* Interface com o usuário
* Coleta de dados
* Envio de dados ao backend
* Exibição de mensagens e feedback

O frontend não realiza cálculos financeiros. Toda lógica crítica está centralizada no backend.

Banco de dados:

* Google Sheets
* Estrutura tabular com modelo relacional simplificado

---

3. ESTRUTURA DE DADOS (ABAS)

LANÇAMENTOS_DB
Cada linha representa uma parcela de um lançamento.

Colunas:
ID
DATA
ANO
MES
TIPO (ENTRADA ou GASTO)
CATEGORIA
SUBCATEGORIA
VALOR (valor total da compra)
PARCELADO (SIM ou NAO)
QTD_PARCELAS
PARCELA_ATUAL
VALOR_PARCELA
ID_CONTA
OBS
DATA_CADASTRO

Essa é a base principal do sistema. Parcelas futuras são criadas no momento do lançamento.

MOVIMENTACAO_CONTAS
Cada linha representa um impacto financeiro real em uma conta.

Colunas:
ID_MOVIMENTACAO
ID_LANCAMENTO
DATA_LANCAMENTO
ANO
MES
ID_CONTA
NOME_CONTA
TIPO_CONTA
TIPO_MOVIMENTACAO (CREDITO ou DEBITO)
VALOR
DATA_CADASTRO

Essa aba é gerada automaticamente pelo backend. No estado atual, não altera saldo, apenas registra movimentações.

CFG_CONTAS
Cadastro de contas financeiras.

Colunas:
ID
TIPO
NOME
INSTITUIÇÃO
LIMITE
SALDO_INICIAL
DIA_FECHAMENTO
DIA_VENCIMENTO
ATIVO
OBS
DATA_CADASTRO

O identificador oficial de conta no sistema é o ID.

CFG_CATEGORIAS
Cadastro de categorias e subcategorias.

Colunas:
ID_CATEGORIA
TIPO (ENTRADA ou GASTO)
CATEGORIA
SUBCATEGORIA
FIXO_VARIAVEL
PERMITE_PARCELA
ATIVO
OBS

Outras abas:

* CFG_DIVIDAS: criada, ainda não integrada
* Abas anuais (2024 a 2027): histórico legado de lançamentos manuais

---

4. ARQUITETURA DE CÓDIGO (APPS SCRIPT)

Organização lógica dos arquivos:

constants.gs
Centraliza nomes de abas, enums (SIM, NAO, ENTRADA, GASTO, CREDITO, DEBITO) e índices de colunas. Evita strings mágicas e facilita manutenção.

lancamentos.gs
Contém a função principal salvarLancamento(). É responsável por validar dados, gerar parcelas, salvar registros em LANÇAMENTOS_DB e acionar o registro de movimentações financeiras.

movimentacoes.gs
Contém a função registrarMovimentacao(). Cria registros em MOVIMENTACAO_CONTAS definindo crédito ou débito, valor da parcela e conta associada. Não altera saldo.

config.gs
Responsável por funções de configuração, como getContasAtivas() e salvarConta().

categorias.gs
Contém a função getCategorias(), que retorna a estrutura hierárquica de categorias organizadas por tipo, categoria e subcategoria.

ui_sidebar.gs
Responsável por criar e abrir as sidebars do sistema.

---

5. REGRAS DE NEGÓCIO

Parcelamento:

* Cada parcela é uma linha na base
* Parcelas futuras são criadas no momento do lançamento
* Parcelas não são recalculadas posteriormente

Impacto financeiro:

* ENTRADA gera movimentação de crédito
* GASTO gera movimentação de débito

Conta:

* O identificador oficial é o ID_CONTA
* Nome e tipo da conta são derivados no backend

Cartão de crédito:

* Fora do escopo atual
* Será tratado futuramente via faturas

---

6. CONTROLE DE VERSÃO E PORTFÓLIO

O projeto está versionado no GitHub, com repositório criado, Git configurado corretamente e fluxo de commits e push funcionando. A branch principal está sincronizada com o repositório remoto.

Este projeto é válido para portfólio por ser um sistema real, com arquitetura definida, regras explícitas, uso consciente de IA como ferramenta e documentação clara por meio deste PROJECT_STATE e do README.

---

7. STATUS DAS FASES DO PROJETO

FASE 0: entendimento e desenho da solução (concluída)
FASE 1: validação das regras e decisões (concluída)
FASE 1.5: centralização de nomes e enums (concluída)
FASE 2: movimentação financeira por conta no backend (concluída)
FASE 2.2: versionamento e organização para portfólio (concluída)
FASE 2.3: ajustes finais de UI (pendente)

---

8. PRÓXIMA ETAPA AO RETOMAR

FASE 2.3:

* Ajustar Sidebar para carregar contas via getContasAtivas()
* Utilizar select baseado em ID_CONTA
* Enviar apenas o ID para o backend
* Backend resolve nome e tipo automaticamente

---

9. PRINCÍPIOS APRENDIDOS NA PRÁTICA

Separação entre UI e backend
Regras de negócio centralizadas no backend
Dados derivados em vez de duplicados
Versionamento desde o início
Documentação como parte do código

Este arquivo representa o estado oficial do projeto e deve ser atualizado sempre que decisões estruturais forem tomadas.

