import * as puppeteer from 'puppeteer'
import blockRequests from '../blockRequests'

export default async function getUrlsFromPage(
  url: string,
  debug: boolean = false
): Promise<string[]> {
  const browser = await puppeteer.launch({
    headless: !debug,
  })
  const page: puppeteer.Page = await browser.newPage().catch(Promise.reject)
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

  await page.goto(url).catch(Promise.reject)
  await page.waitForSelector('.photo-list-photo-interaction > a')
  const data: string[] = await page
    .evaluate(() => {
      return (Array.from(
        document.querySelectorAll('.photo-list-photo-interaction > a')
      ) as HTMLLinkElement[]).map(e => e.href)
      // return Array.from(
      //   document.querySelectorAll(
      //     '.photo-display-item > .hover-target > .thumb > .photo_container > .photo-click'
      //   )
      // ).map(e => e.href) // if something fucks up, try this
    })
    .catch(Promise.reject)

  browser.close()
  return data
}
