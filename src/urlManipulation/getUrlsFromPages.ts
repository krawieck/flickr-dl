import * as URL from 'url'
import getUrlsFromPage from './getUrlsFromPage'
import * as urlJoin from 'url-join'
import * as puppeteer from 'puppeteer'

export default async function getUrlsFromPages(
  url: string,
  numberOfPages: number,
  progressCallback: (progress: number, numberOfPages: number, success: boolean) => void = () => {},
  debug = false
): Promise<string[]> {
  // weird setup for iterator
  let iterator = Array(numberOfPages)
    .fill(undefined)
    .map((e, i) => i + 1)
  let urls = []
  let progress = 0
  // iterating over pages
  const browser = await puppeteer
    .launch({
      headless: !debug,
    })
    .catch(() => undefined)
  for await (const num of iterator) {
    let success = false
    const tempUrls = await getUrlsFromPage(urlJoin(url, `page${num}`), debug, browser)
    if (tempUrls instanceof Array && tempUrls.length !== 0) {
      urls.push(tempUrls)
      success = true
    }

    if (progressCallback) progressCallback(++progress, numberOfPages, success)
  }
  if (browser) browser.close()
  return urls.reduce((prev, curr) => prev.concat(curr))
}
