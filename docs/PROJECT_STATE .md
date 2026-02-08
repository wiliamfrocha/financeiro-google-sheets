# **PROJECT\_STATE — SISTEMA DE CONTROLE FINANCEIRO**

**Status geral:** até **FASE 2.1 (arquitetura definida, UI pendente)**  
**Última atualização:** hoje

---

## **1️VISÃO GERAL DO PROJETO**

**Nome:** Sistema Financeiro Pessoal  
**Objetivo:**  
Criar um sistema de controle financeiro pessoal utilizando Google Sheets como banco de dados, com backend em Google Apps Script e frontend em Sidebar HTML/JS. O sistema registra entradas e gastos, suporta parcelamento, contas, categorias e gera movimentações financeiras reais por conta.

**Uso do projeto:**

* Uso real no dia a dia  
* Projeto **válido para portfólio** (arquitetura limpa, regras claras e separação de responsabilidades)

---

## **2️STACK TECNOLÓGICA (OFICIAL)**

###  **Backend**

* Google Apps Script  
* Linguagem: JavaScript

**Responsabilidades do backend:**

* Validação de dados  
* Aplicação das regras de negócio  
* Geração de parcelas  
* Persistência dos dados  
* Registro de movimentações financeiras

---

###  **Frontend**

* HTML \+ CSS \+ JavaScript  
* Executado via **Sidebar do Google Sheets**

**Responsabilidades do frontend:**

* Coletar dados do usuário  
* Enviar dados ao backend  
* Exibir mensagens e feedback

O frontend **não realiza cálculos financeiros**.

---

### **Banco de Dados**

* Google Sheets  
* Estrutura tabular (modelo relacional simplificado)

---

## **3️ ESTRUTURA DE DADOS (ABAS)**

### **`LANÇAMENTOS_DB`**

Cada **linha representa uma parcela**.

**Colunas:**

ID  
DATA  
ANO  
MES  
TIPO            (ENTRADA | GASTO)  
CATEGORIA  
SUBCATEGORIA  
VALOR           (valor total da compra)  
PARCELADO       (SIM | NAO)  
QTD\_PARCELAS  
PARCELA\_ATUAL  
VALOR\_PARCELA  
ID\_CONTA  
OBS  
DATA\_CADASTRO

---

### **`MOVIMENTACAO_CONTAS`**

Cada **linha representa um impacto financeiro real**.

**Colunas:**

ID\_MOVIMENTACAO  
ID\_LANCAMENTO  
DATA\_LANCAMENTO  
ANO  
MES  
ID\_CONTA  
NOME\_CONTA  
TIPO\_CONTA  
TIPO\_MOVIMENTACAO   (CREDITO | DEBITO)  
VALOR  
DATA\_CADASTRO

Gerada automaticamente pelo backend  
**Ainda não atualiza saldo** (controle futuro)

---

### **`CFG_CONTAS`**

Cadastro de contas financeiras.

**Colunas:**

ID  
TIPO  
NOME  
INSTITUIÇÃO  
LIMITE  
SALDO\_INICIAL  
DIA\_FECHAMENTO  
DIA\_VENCIMENTO  
ATIVO  
OBS  
DATA\_CADASTRO

---

 **`CFG_CATEGORIAS`**

Categorias e subcategorias de lançamentos.

**Colunas:**

ID\_CATEGORIA  
TIPO              (ENTRADA | GASTO)  
CATEGORIA  
SUBCATEGORIA  
FIXO\_VARIAVEL  
PERMITE\_PARCELA  
ATIVO  
OBS

---

### **Outras Abas**

* `CFG_DIVIDAS` → criada, ainda não integrada  
* Abas por ano (2024–2027) → **histórico legado**

---

## **4️ARQUITETURA DE CÓDIGO (Apps Script)**

### **Organização de Arquivos**

* `constants.gs`  
  * Centralização de:  
    * Nomes de abas  
    * ENUMs (SIM, NAO, ENTRADA, GASTO)  
    * Índices de colunas  
* `lancamentos.gs`  
  * Função principal: `salvarLancamento()`  
  * Valida dados  
  * Gera parcelas  
  * Salva registros em `LANÇAMENTOS_DB`  
  * Aciona registro de movimentações  
* `movimentacoes.gs`  
  * Função: `registrarMovimentacao()`  
  * Cria registros em `MOVIMENTACAO_CONTAS`  
  * Não altera saldo  
* `config.gs`  
  * `getContasAtivas()`  
  * `salvarConta()`  
* `categorias.gs`  
  * `getCategorias()`  
* `ui_sidebar.gs`  
  * Criação e abertura das sidebars

---

## **5️REGRAS DE NEGÓCIO (OFICIAIS)**

* **Parcelamento:**  
  * Uma parcela \= uma linha na base  
  * Parcelas futuras já são criadas no momento do lançamento  
  * Parcelas nunca são recalculadas posteriormente  
* **Impacto financeiro:**  
  * ENTRADA → crédito  
  * GASTO → débito  
* **Conta:**  
  * O identificador oficial é o **ID\_CONTA**  
  * Nome e tipo da conta são derivados no backend  
* **Cartão de crédito:**  
  * Ainda **fora do escopo atual**  
  * Será tratado futuramente via faturas

---

## **6️ STATUS DAS FASES DO PROJETO**

*  FASE 0 — entendimento e desenho da solução  
* FASE 1 — validação das regras e decisões  
*  FASE 1.5 — centralização de nomes e enums  
* FASE 2 — movimentação financeira por conta (backend)  
* FASE 2.1 — pendente  
  * Ajustes no frontend (Sidebar)  
  * Seleção de conta via ID

---

## **7️ PRÓXIMA ETAPA AO RETOMAR**

###  **FASE 2.1 — Ajustes de UI**

* Atualizar `Sidebar.html`  
* Carregar contas via `getContasAtivas()`  
* Utilizar `<select>` baseado em `ID_CONTA`  
* Enviar apenas o ID para o backend  
* Backend preenche nome e tipo automaticamente

---

## **8️ BOAS PRÁTICAS ADOTADAS**

* Separação clara de responsabilidades (UI x backend)  
* Regras de negócio centralizadas  
* Estrutura preparada para crescimento  
* Código organizado e reutilizável

---

**Este arquivo representa o estado oficial do projeto e deve ser mantido atualizado a cada decisão estrutural importante.**

