const puppeteer = require('puppeteer')
const blockRequests = require('./blockRequests')

module.exports = async function getUrlsFromPage (url, debug = false) {
  const browser = await puppeteer.launch({
    headless: !debug
  })
  const page = await browser.newPage().catch(e => Promise.reject(e))
  blockRequests(
    page,
    'stylesheet',
    'media',
    'font',
    'websocket',
    'image',
    'other',
    'manifest',
    'texttrack',
    'xhr',
    'fetch',
    'eventsource',
    'websocket'
  )

  await page.goto(url).catch(e => Promise.reject(e))
  await page.waitForSelector(
    '.photo-display-item > .hover-target > .thumb > .photo_container > .photo-click'
  )
  const data = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        '.photo-display-item > .hover-target > .thumb > .photo_container > .photo-click'
      )
    ).map(e => e.href)
    // return Array.from(document.querySelectorAll('.overlay')).map(e => e.href) // if something fucks up, try this
  })

  browser.close()
  return data
}
