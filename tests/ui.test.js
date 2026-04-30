const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testUI() {
  // Configuração Headless exigida para CI
  let options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Acessa a aplicação rodando localmente no CI
    await driver.get('http://localhost:3000/index');

    // Aguarda até que o h1 seja carregado na tela
    let titleElement = await driver.wait(until.elementLocated(By.css('h1')), 5000);
    let titleText = await titleElement.getText();

    // Validação
    if (titleText === 'Saudações!') {
      console.log('Sucesso: O título da página está correto!');
    } else {
      console.error(`Falha: Esperava "Saudações!", mas encontrou "${titleText}"`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Erro durante a execução do Selenium:', error);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();