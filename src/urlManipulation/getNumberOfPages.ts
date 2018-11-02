import * as puppeteer from 'puppeteer'
import blockRequests from '../blockRequests'

export default async function getNumberOfPages(url: string, debug = false): Promise<number> {
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
  await page.goto(url, { timeout: 0 }).catch(gtfo)

  await page.waitForSelector('.view.pagination-view.photostream').catch(gtfo)
  const result = await page
    .evaluate(() =>
      Number(
        (Array.from(
          (document.querySelector('.view.pagination-view.photostream') as ParentNode).children,
        ).reverse()[1] as HTMLElement).innerText,
      ),
    )
    .catch(e => 1)

  function gtfo(e: Error | String): Promise<never> {
    browser.close()
    return Promise.reject(e)
  }
  await browser.close()
  return result
}
