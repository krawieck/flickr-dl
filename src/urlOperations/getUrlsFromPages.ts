import * as URL from 'url'
import getUrlsFromPage from './getUrlsFromPage'

export default async function getUrlsFromPages(
  url: string,
  numberOfPages: number,
  progressCallback: (progress: number, numberOfPages: number, success: boolean) => void = () => {},
  debug = false,
) {
  // weird setup for iterator
  let iterator = Array(numberOfPages)
    .fill(undefined)
    .map((e, i) => i + 1)
  let urls = []
  let progress = 0
  // iterating over pages
  for await (const num of iterator) {
    let success = false
    const tempUrls = await getUrlsFromPage(URL.resolve(url, `page${num}`), debug)
    if (tempUrls instanceof Array && tempUrls.length !== 0) {
      urls.push(tempUrls)
      success = true
    }
    if (progressCallback) progressCallback(++progress, numberOfPages, success)
  }
  return urls.reduce((prev, curr) => prev.concat(curr))
}
