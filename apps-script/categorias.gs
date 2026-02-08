function getCategorias() {
  const ss = SpreadsheetApp.getActive();
  const aba = ss.getSheetByName(SHEETS.CATEGORIAS);
  const dados = aba.getDataRange().getValues();

  const header = dados.shift();

  const idx = {
    tipo: header.indexOf('TIPO'),
    categoria: header.indexOf('CATEGORIA'),
    subcategoria: header.indexOf('SUBCATEGORIA'),
    permiteParcela: header.indexOf('PERMITE_PARCELA'),
    ativo: header.indexOf('ATIVO')
  };

  const resultado = {};

  dados.forEach(l => {
    if (l[idx.ativo] !== 'SIM') return;

    const tipo = l[idx.tipo];
    const categoria = l[idx.categoria];

    if (!resultado[tipo]) resultado[tipo] = {};
    if (!resultado[tipo][categoria]) resultado[tipo][categoria] = [];

    resultado[tipo][categoria].push({
      subcategoria: l[idx.subcategoria],
      permiteParcela: l[idx.permiteParcela]
    });
  });

  return resultado;
}

