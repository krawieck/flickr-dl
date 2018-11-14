import getUrlsFromPages from '../urlManipulation/getUrlsFromPages'

export default async function getUrlsFromPagesCLI(
  url: string,
  numberOfPages: number,
  debug: boolean = false
): Promise<string[]> {
  process.stdout.write('  Getting URLs from pages...')
  let failures = 0

  const urls: string[] = await getUrlsFromPages(
    url,
    numberOfPages,
    (current, max, success) => {
      if (!success) failures++
      process.stdout.write(
        `\r  Getting URLs from pages... ${Math.round(
          (current / max) * 100
        )}% done  (${current}/${max})${failures ? `. Failure happened ${failures} times` : ''}`
      )
    },
    debug
  ).catch(Promise.reject)

  process.stdout.write('\r✔ Getting URLS from pages... 100% done!\n')
  return urls
}
