function salvarLancamento(dados) {
  const ss = SpreadsheetApp.getActive();
  const aba = ss.getSheetByName(SHEETS.LANCAMENTOS);


  if (!aba) {
    throw new Error('Aba LANÇAMENTOS_DB não encontrada');
  }

  // ==========================
  // VALIDAÇÕES OBRIGATÓRIAS
  // ==========================
  if (!dados.tipo || !dados.categoria || !dados.subcategoria) {
    throw new Error('Tipo, categoria e subcategoria são obrigatórios');
  }

  if (!dados.data) {
    throw new Error('Data é obrigatória');
  }

  if (!dados.valor || Number(dados.valor) <= 0) {
    throw new Error('Valor inválido');
  }

  if (dados.parcelado) {
    if (!dados.parcelas || Number(dados.parcelas) < 2) {
      throw new Error('Parcelamento inválido');
    }
  }

  // ==========================
  // PROCESSAMENTO
  // ==========================
  const data = new Date(dados.data);
  const totalParcelas = dados.parcelado ? Number(dados.parcelas) : 1;
  const valorTotal = Number(dados.valor);
  const valorParcela = valorTotal / totalParcelas;


  for (let i = 1; i <= totalParcelas; i++) {
  const dataParcela = new Date(data);
  dataParcela.setMonth(data.getMonth() + (i - 1));

  const idLancamento = Utilities.getUuid();

  aba.appendRow([
    idLancamento,               // ID
    dataParcela,                // DATA
    dataParcela.getFullYear(),  // ANO
    dataParcela.getMonth() + 1, // MES
    dados.tipo,                 // TIPO
    dados.categoria,
    dados.subcategoria,
    valorTotal,
    dados.parcelado ? ENUM.SIM : ENUM.NAO,
    totalParcelas,
    i,
    valorParcela,
    dados.conta,                // ID_CONTA (temporário)
    dados.obs || '',
    new Date()
  ]);

  // REGISTRA MOVIMENTAÇÃO
  registrarMovimentacao(
    {
      id: idLancamento,
      tipo: dados.tipo,
      idConta: dados.conta,
      nomeConta: '',   // vamos preencher depois
      tipoConta: ''    // vamos preencher depois
    },
    dataParcela,
    valorParcela
  );
}

  return 'Lançamento salvo com sucesso';
}

