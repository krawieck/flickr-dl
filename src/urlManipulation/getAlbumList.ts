import { launch as launchBrowser, Browser, Page } from 'puppeteer'

export default async function getAlbumList(url: string, debug: boolean = false): Promise<string[]> {
  const browser: Browser = await launchBrowser().catch(Promise.reject)
  const page: Page = await browser.newPage()

  await page.goto(url).catch(Promise.reject)

  const urls: string[] = await page
    .evaluate(() =>
      (Array.from(
        document.querySelectorAll('.photo-list-album-interaction > a')
      ) as HTMLLinkElement[]).map(e => e.href)
    )
    .catch(Promise.reject)

  await browser.close()
  return urls
}
