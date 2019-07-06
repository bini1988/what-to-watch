const puppeteer = require(`puppeteer`);
const path = require(`path`);

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(`http://localhost:1337/`);
  await page.screenshot({path: path.join(__dirname, `index.png`)});

  await browser.close();
})();
