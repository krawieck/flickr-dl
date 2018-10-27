const puppeteer = require('puppeteer')
const blockRequests = require('./blockRequests')
const { pad } = require('./util')

module.exports = async function getPhoto (url, debug = false) {
  if (!/^https:\/\/www\.flickr\.com\/photos\/[^\s\\/]+\/\d+\/?$/.test(url)) {
    return Promise.reject(new Error("url doesn't match the scheme"))
  }

  const browser = await puppeteer
    .launch({
      headless: !debug
    })
    .catch(Promise.reject)
  const page = await browser.newPage().catch(Promise.reject)

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

  await page.goto(url, {
    timeout: 0
  })
  // await page.waitForSelector('.date-taken-label')

  const date = new Date(
    await page.evaluate(() => document.querySelector('.date-taken-label').innerText.slice(9))
  )
  await page.goto(`${url}/sizes/k/`) // goto best quality
  // page.waitForSelector('#allsizes-photo > img')
  let finalUrl = await page.evaluate(() => document.querySelector('#allsizes-photo > img').src)

  browser.close()
  return [
    finalUrl,
    `img/${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}.jpg`
  ]
}
