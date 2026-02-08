# financeiro-google-sheets
# Sistema de Controle Financeiro Pessoal (Google Sheets)

##Visão Geral
Este projeto é um sistema de controle financeiro pessoal desenvolvido para uso real no dia a dia.  
Ele permite registrar entradas e gastos, controlar parcelamentos e gerar movimentações financeiras por conta.

O sistema utiliza Google Sheets como banco de dados, Google Apps Script como backend e HTML/JavaScript como frontend, executado via Sidebar do Google Sheets.

---

## Objetivos do Projeto
- Centralizar registros financeiros
- Garantir integridade dos dados
- Separar responsabilidades entre interface e regras de negócio
- Servir como projeto prático de aprendizado e portfólio

---

## Stack Tecnológica

### Backend
- Google Apps Script
- Linguagem: JavaScript

Responsável por:
- Validação de dados
- Aplicação das regras de negócio
- Geração de parcelas
- Registro de movimentações financeiras

---

### Frontend (UI)
- HTML
- JavaScript

Executado via Sidebar do Google Sheets.

Responsável por:
- Coletar dados do usuário
- Enviar informações ao backend
- Exibir feedback visual

O frontend não realiza cálculos financeiros.

---

### Banco de Dados
- Google Sheets
- Estrutura tabular (modelo relacional simplificado)

Cada aba representa uma entidade do sistema.

---

## Estrutura de Dados (Abas)

### LANÇAMENTOS_DB
Cada linha representa uma parcela financeira.

Campos principais:
- Tipo (ENTRADA ou GASTO)
- Categoria e Subcategoria
- Parcelamento
- Conta vinculada
- Valor total e valor da parcela

---

### MOVIMENTACAO_CONTAS
Registra o impacto financeiro real por conta.

- ENTRADA → Crédito
- GASTO → Débito

---

### CFG_CONTAS
Cadastro de contas financeiras (corrente, crédito, investimento, etc).

---

### CFG_CATEGORIAS
Cadastro de categorias e subcategorias, com regras de parcelamento.

---

## Arquitetura

O sistema é dividido em três camadas principais:

UI (Sidebar HTML)
↓
Backend (Apps Script)
↓
Banco de Dados (Google Sheets)
As regras de negócio são centralizadas no backend, garantindo consistência e escalabilidade.

---

## Evolução do Projeto

O desenvolvimento é organizado por fases:

- Fase 0: entendimento do problema e desenho da solução
- Fase 1: definição das regras de negócio
- Fase 1.5: centralização de constantes e enums
- Fase 2: registro de movimentações financeiras por conta
- Fase 2.1: ajustes de UI com seleção de conta por ID

Cada fase é documentada para manter rastreabilidade técnica.

---

##Documentação Técnica
O projeto possui um arquivo de estado chamado `PROJECT_STATE.md`, que documenta decisões arquiteturais, regras e status atual do sistema.

---

## Status Atual
Em desenvolvimento — Fase 2.1 concluída (UI ajustada)

---

## Portfólio
Este projeto é utilizado como portfólio técnico, demonstrando:
- Arquitetura limpa
- Separação de responsabilidades
- Uso de backend, frontend e banco de dados
- Evolução incremental de um sistema real

---

##Uso de IA
Ferramentas de IA foram utilizadas como apoio durante o desenvolvimento, com validação e entendimento completo das decisões técnicas envolvidas.
