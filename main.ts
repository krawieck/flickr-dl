// import { getNumberOfPages, getUrlsFromPages, download, getPhoto } from ''

import getNumberOfPages from './src/urlManipulation/getNumberOfPages'
import getUrlsFromPages from './src/urlManipulation/getUrlsFromPages'
import getPhoto from './src/urlManipulation/getPhoto'
import download from './src/download'

const argv = require('minimist')(process.argv.slice(2))
;(async () => {
  // handle help
  if (argv['?'] || argv.h) {
    console.log(`
gimmie url for flickr profile to download all of this person's photos

usage:    npm start -- <url>
          node main.js <url>

optional parameters:
          -o <path>       outputs images to <path>, default is "img/"
          -d              turns on debug mode, which basically just turn puppeteer's headless mode off

examples: npm start -- https://www.flickr.com/photos/megane_wakui/
          node main.js https://www.flickr.com/photos/megane_wakui/`)
    process.exit()
  }
  // get all the variables
  const debug = !!argv.d

  const url = argv._[0]
  const dir = argv.o || 'img/'
  // check if someone is a moron
  if (!url) {
    catchErrorAndGTFO('I need url to make something of it')
  }

  // getting number of pages (duh)
  process.stdout.write('  Getting number of pages...')
  const numberOfPages: number = (await getNumberOfPages(url, debug).catch(
    catchErrorAndGTFO,
  )) as number
  process.stdout.write('\r✔ Getting number of pages... Done!\n')

  // getting urls from pages (duhh)
  process.stdout.write('  Getting URLs from pages...')
  let failures = 0

  const urls: string[] = (await getUrlsFromPages(
    url,
    numberOfPages,
    (current, max, success) => {
      if (!success) failures++
      process.stdout.write(
        `\r  Getting URLs from pages... \
${Math.round((current / max) * 100)}% done  (${current}/${max})\
${failures ? `. Failure happened ${failures} times` : ''}`,
      )
    },
    debug,
  ).catch(catchErrorAndGTFO)) as string[]

  process.stdout.write('\r✔ Getting URLS from pages... 100% done!\n')

  // downloading the photos (duhhhh)
  let dlCount = 0
  let failedCount = 0
  process.stdout.write('  Downloading photos...')
  for (let url of urls) {
    dlCount++
    await getPhoto(url)
      .then(e => download(e[0], e[1], dir)) // @TODO FIND OUT HOW TO REPLACE THAT WITH SPREAD OPERATOR WITHOUT FUCKING TYPESCRIPT FLIPPING OUT
      .catch(e => {
        process.stderr.write('\n' + e + '\n')
        failedCount++
      })
    process.stdout.write(
      `\r  Downloading photos... \
${(Math.round((dlCount / urls.length) * 10000) / 100).toFixed(2).padStart(6, ' ')}% done  \
(${dlCount}/${urls.length})\
${
        failedCount
          ? `. ${(Math.round((failedCount / dlCount) * 10000) / 100)
              .toFixed(2)
              .padStart(6, ' ')}% failed`
          : ''
      }`,
    )
  }

  process.stdout.write(`\r✔ Downloading photos... 100.00% done!\n`)
})()

function catchErrorAndGTFO(e: any) {
  console.error('\n', e)
  process.exit()
}
