const getUrlsFromPage = require('./getUrlsFromPage.js')

module.exports = async function getUrlsFromPages (
  url,
  numberOfPages,
  progressCallback = undefined,
  debug = false
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
    const tempUrls = await getUrlsFromPage(`${url}/page${num}`, debug)
    if (tempUrls instanceof Array && tempUrls.length !== 0) {
      urls.push(tempUrls)
      success = true
    }
    if (progressCallback) progressCallback(++progress, numberOfPages, success)
  }
  return urls.reduce((prev, curr) => prev.concat(curr))
}
