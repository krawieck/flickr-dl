import * as puppeteer from 'puppeteer'
import blockRequests from '../blockRequests'
import { pad } from '../util'
import * as URL from 'url'

export default async function getPhoto(
  url: string,
  debug: boolean = false,
): Promise<[string, string]> {
  if (!/^https:\/\/(www\.)?flickr\.com\/photos\/[^\s\\/]+\/\d+\/?$/.test(url)) {
    return Promise.reject(new Error("url doesn't match the scheme"))
  }
  const gtfo = (e: Error): Promise<never> => {
    browser.close()
    return Promise.reject(e)
  }
  const browser: puppeteer.Browser = await puppeteer
    .launch({
      headless: !debug,
    })
    .catch(Promise.reject)
  const page: puppeteer.Page = await browser.newPage().catch(gtfo)

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
    'websocket',
  )

  await page
    .goto(url, {
      timeout: 0,
    })
    .catch(gtfo)
  // await page.waitForSelector('.date-taken-label')

  const date = new Date(
    await page
      .evaluate(() =>
        (document.querySelector('.date-taken-label') as HTMLElement).innerText.slice(9),
      )
      .catch(gtfo),
  )
  await page.goto(URL.resolve(url, 'sizes/k/')).catch(gtfo)
  // page.waitForSelector('#allsizes-photo > img')
  const finalUrl = await page
    .evaluate(() => (document.querySelector('#allsizes-photo > img') as HTMLImageElement).src)
    .catch(gtfo)

  browser.close()
  return [finalUrl, `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}.jpg`]
}
