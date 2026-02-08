function registrarMovimentacao(lancamento, parcelaData, valorParcela) {
  const ss = SpreadsheetApp.getActive();
  const aba = ss.getSheetByName(SHEETS.MOVIMENTACOES);

  if (!aba) {
    throw new Error('Aba MOVIMENTACAO_CONTAS não encontrada');
  }

  const tipoMov = lancamento.tipo === ENUM.ENTRADA ? 'CREDITO' : 'DEBITO';

  aba.appendRow([
    Utilities.getUuid(),        // ID_MOVIMENTACAO
    lancamento.id,             // ID_LANCAMENTO
    parcelaData,               // DATA_LANCAMENTO
    parcelaData.getFullYear(), // ANO
    parcelaData.getMonth() + 1,// MES
    lancamento.idConta,        // ID_CONTA
    lancamento.nomeConta,      // NOME_CONTA
    lancamento.tipoConta,      // TIPO_CONTA
    tipoMov,                   // TIPO_MOVIMENTACAO
    valorParcela,              // VALOR
    new Date()                 // DATA_CADASTRO
  ]);
}

