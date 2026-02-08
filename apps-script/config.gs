function getContasAtivas() {
  const sheet = SpreadsheetApp.getActive()
    .getSheetByName(SHEETS.CONTAS);


  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  return data
    .slice(1)
    .filter(l => l[COL_CONTAS.ATIVO] === true || l[COL_CONTAS.ATIVO] === ENUM.SIM) // ATIVO
    .map(l => ({
      tipo: l[1],
      nome: l[2],
      instituicao: l[3]
    }));
}
function salvarConta(dados) {
  const sheet = SpreadsheetApp.getActive()
    .getSheetByName("CFG_CONTAS");

  sheet.appendRow([
    Utilities.getUuid(),        // ID
    dados.tipo,                 // TIPO
    dados.nome,                 // NOME
    dados.instituicao,          // INSTITUICAO
    Number(dados.limite || 0),
    Number(dados.saldo || 0),
    dados.fechamento || "",
    dados.vencimento || "",
    dados.ativo,
    dados.obs,
    new Date()
  ]);

  return "Conta cadastrada com sucesso!";
}

