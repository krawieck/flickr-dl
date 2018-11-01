import * as puppeteer from "puppeteer";
import blockRequests from "./blockRequests";

export default async function getNumberOfPages(
  url: string,
  debug = false
): Promise<number> {
  let browser: puppeteer.Browser, page: puppeteer.Page;
  try {
    browser = await puppeteer
      .launch({
        headless: !debug
      })
      .catch(Promise.reject);
    page = await browser.newPage().catch(Promise.reject);
    blockRequests(
      page,
      "stylesheet",
      "media",
      "font",
      "websocket",
      "image",
      "other",
      "manifest",
      "texttrack",
      "xhr",
      "fetch",
      "eventsource",
      "websocket"
    );
    await page.goto(url, { timeout: 0 });
  } catch (e) {
    return Promise.reject(e);
  }
  await page.waitForSelector(".view.pagination-view.photostream");
  const result = await page
    .evaluate(() =>
      Number(
        (Array.from(
          (document.querySelector(
            ".view.pagination-view.photostream"
          ) as ParentNode).children
        ).reverse()[1] as HTMLElement).innerText
      )
    )
    .catch(e => 1);
  await browser.close();
  return result;
}
