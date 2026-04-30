const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); 

async function testGoogle() {
  let options = new chrome.Options();
  options.addArguments('--headless'); 
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.google.com');
    
    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium WebDriver');
    await searchBox.submit();

    await driver.wait(until.titleContains('Selenium'), 5000);
    console.log("Teste de fumaça no Google: Sucesso!");
  } finally {
    await driver.quit();
  }
};

test('Google Search Test', async () => {
  await testGoogle();
}, 15000); 