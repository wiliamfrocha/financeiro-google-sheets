function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Financeiro')
    .addItem('Novo lançamento', 'abrirSidebar')
    .addItem("Cadastrar Contas", "abrirSidebarContas")
    .addToUi();
}
