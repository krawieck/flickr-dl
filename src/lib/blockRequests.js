/**
 * @typedef {Class} Page
 */

/**
 * Blocks given types of resurces from getting downloaded. Should be called right before `page.goto()`
 *
 * @param {Page} page
 * @param {...ResourceType} resourceTypes
 */
module.exports = function blockRequests (page, ...resourceTypes) {
  page.setRequestInterception(true)
  page.on('request', request => {
    if (resourceTypes.includes(request.resourceType())) {
      request.abort()
    } else {
      request.continue()
    }
  })
}
// | "document"
// | "stylesheet"
// | "image"
// | "media"
// | "font"
// | "script"
// | "texttrack"
// | "xhr"
// | "fetch"
// | "eventsource"
// | "websocket"
// | "manifest"
// | "other";
