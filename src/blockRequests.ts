import { Page, ResourceType } from 'puppeteer'

/**
 * Blocks given types of resurces from getting downloaded. Should be called right before `page.goto()`
 *
 * Resource types are: "document", "stylesheet", "image", "media", "font", "script", "texttrack", "xhr", "fetch", "eventsource", "websocket", "manifest" and "other"
 */
export default function blockRequests(page: Page, ...resourceTypes: ResourceType[]): void {
  page.setRequestInterception(true)
  page.on('request', request => {
    if (resourceTypes.includes(request.resourceType())) {
      request.abort()
    } else {
      request.continue()
    }
  })
}
