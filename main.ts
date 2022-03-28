import puppeteer from 'puppeteer';
import notifier from 'node-notifier'

const PAGE_URL = `https://www.cgeonline.com.ar/informacion/apertura-de-citas.html`
const SELECTOR = `#contenido > div > div > div > table > tbody > tr:nth-child(11) > td:nth-child(3)`

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(PAGE_URL);
  
  const text = await page.$eval(SELECTOR, e => e.textContent);
  
  if (text !== 'fecha por confirmar') {
    notifier.notify({
      title: 'TURNOS PARA PASAPORTE',
      message: `Hay turnos para pasaporte: ${text}`
    });
  } else {
    console.log(`No hay turnos todavía :(`)
  }
  
  await browser.close();
}

main()

setInterval(() => {
  main()
}, 1000 * 60 * 60)