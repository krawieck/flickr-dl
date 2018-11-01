import { Page, ResourceType } from 'puppeteer'

/**
 * Gets number of pages from user profile on filckr
 */
export function getNumberOfPages(url: string): Promise<string>
export function getPhoto(url: string): Promise<{ url: string; name: string }>
export function dlPhoto(url: string): Promise<void>
export function promiseAllWithProgress(
  promises: Array<Promise<any>>,
  callback: Function
): Array<Promise<any>>
export function getUrlsFromPage(url: string): Promise<{ url: string; name: string }>
export function getUrlsFromPages(
  url: string,
  numberOfPages: Number | string,
  progressCallback: (progress: number, numberOfPages: number, success: boolean) => void
): Promise<String[]>

/**
 * Blocks given types of resurces from getting downloaded. Should be called right before `page.goto()`
 *
 */
// export function blockRequests(
//   page: Page,
//   /**
//    * Resource types
//    */
//   ...resourceTypes: ResourceType[]
// ): void

// getNumberOfPages,
//   dlPhoto,
//   promiseAllWithProgress,
// getPhoto
// getUrlsFromPage,
//   getUrlsFromPages,

export function download(uri: string, filename: string): Promise<void>
