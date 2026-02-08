function abrirSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Novo Lançamento');

  SpreadsheetApp.getUi().showSidebar(html);
}
function abrirSidebarContas() {
  const html = HtmlService.createHtmlOutputFromFile("SidebarContas")
    .setTitle("Cadastro de Contas");
  SpreadsheetApp.getUi().showSidebar(html);
}
