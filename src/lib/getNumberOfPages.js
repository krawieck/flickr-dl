const puppeteer = require('puppeteer')
const blockRequests = require('./blockRequests')

module.exports = async function getNumberOfPages (url, debug = false) {
  let browser, page
  try {
    browser = await puppeteer.launch({
      headless: !debug
    })
    page = await browser.newPage()
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
    await page.goto(url, { timeout: 0 })
  } catch (e) {
    Promise.reject(e)
  }
  await page.waitForSelector('.view.pagination-view.photostream')
  const result = await page
    .evaluate(() =>
      Number(
        Array.from(
          document.querySelector('.view.pagination-view.photostream').children
        ).reverse()[1].innerText
      )
    )
    .catch(e => 1)
  await browser.close()
  return result
}
