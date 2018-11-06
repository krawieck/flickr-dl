import * as puppeteer from 'puppeteer'
import catchErrorAndGTFO from '../catchErrorAndGTFO'
import blockRequests from '../blockRequests'

export default async function getWaterfallUrls(
  url: string,
  debug: boolean = false
): Promise<string[]> {
  const browser: puppeteer.Browser = await puppeteer.launch().catch(Promise.reject)
  const page: puppeteer.Page = await browser.newPage().catch(Promise.reject)

  await page.goto(url).catch(Promise.reject)
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
  const result = await page
    .evaluate(
      async () =>
        new Promise((resolve, reject) => {
          try {
            const maxScroll = Number.MAX_SAFE_INTEGER
            let lastScroll = 0
            const interval = setInterval(() => {
              window.scrollBy(0, 100)
              const scrollTop = document.documentElement!.scrollTop
              if (scrollTop === maxScroll || scrollTop === lastScroll) {
                clearInterval(interval)
                resolve(
                  (Array.from(
                    document.querySelectorAll('.photo-list-photo-interaction > a')
                  ) as HTMLLinkElement[]).map(e => e.href)
                )
              } else {
                lastScroll = scrollTop
              }
            }, 100)
          } catch (err) {
            reject(err)
          }
        })
    )
    .catch(Promise.reject)
  return result
}
