import puppeteer from 'puppeteer'

class Crawler {
  constructor () {
    this.init()
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: true, // Show Browser, in production always true
      defaultViewport: null,
      devtools: false, // Open devtools
      executablePath: '/usr/bin/google-chrome',
      args: [
        '--incognito',
        '--no-sandbox',
        '--single-process',
        '--no-zygote',
        '--start-maximized'
      ],
    })
    const [page] = await this.browser.pages();
    this.page = page
  }

  async dribbble() {
    await this.page.goto('https://dribbble.com/')
    await this.page.waitForSelector('li > div.shot-details-container.js-shot-details-container > div.user-information > a.hoverable.url > span')
    const title = await this.page.evaluate(() => {
      const title = document.querySelector('li > div.shot-details-container.js-shot-details-container > div.user-information > a.hoverable.url > span')
      return title.innerHTML
    })
    return title
  }
}

export default Crawler
