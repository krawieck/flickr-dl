import getNumberOfPages from './src/urlManipulation/getNumberOfPages'
import getUrlsFromPages from './src/urlManipulation/getUrlsFromPages'
import getUrlType from './src/urlManipulation/getUrlType'
import getPhoto from './src/urlManipulation/getPhoto'
import download from './src/download'

const argv = require('minimist')(process.argv.slice(2))
;(async () => {
  // handle help
  if (argv['?'] || argv.h) {
    console.log(`
gimmie url for flickr profile to download all of this person's photos

usage:    npm start -- <url>

 (warning: <url> has to start with "https://") 

optional parameters:
          -o <path>       outputs images to <path>, default is "img/"
          -d              turns on debug mode, which basically just turn puppeteer's headless mode off

examples: npm start -- https://www.flickr.com/photos/megane_wakui/`)
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
  console.log({ url })

  const typeOfUrl = getUrlType(url)
  console.log({ typeOfUrl })

  switch (typeOfUrl) {
    case 'photostream' || 'favorites': {
      const numOfPages = await getNumberOfPagesCLI(url, debug)
      const urls = await getUrlsFromPagesCLI(url, numOfPages, debug)
      await downloadPhotosCLI(urls, dir)
      break
    }

    case 'photo': {
      break
    }

    case 'album': {
      break
    }

    case 'albumList': {
      break
    }

    default: {
      catchErrorAndGTFO("can't determine type of the url")
      break
    }
  }
})()

function catchErrorAndGTFO(...e: any): never {
  console.error('\n', ...e)
  return process.exit()
}

async function downloadPhotosCLI(
  urls: string[],
  dir: string,
  debug: boolean = false
): Promise<void> {
  let dlCount = 0
  let failedCount = 0
  process.stdout.write('  Downloading photos...')
  for (const url of urls) {
    dlCount++
    await getPhoto(url)
      .then(e => download(e[0], e[1], dir)) // @TODO FIND OUT HOW TO REPLACE THAT WITH SPREAD OPERATOR WITHOUT TYPESCRIPT FUCKING FLIPPING OUT
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
      }`
    )
  }
  process.stdout.write(`\r✔ Downloading photos... 100.00% done!\n`)
}

async function getUrlsFromPagesCLI(
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
  ).catch(catchErrorAndGTFO)

  process.stdout.write('\r✔ Getting URLS from pages... 100% done!\n')
  return urls
}

async function getNumberOfPagesCLI(url: string, debug: boolean = false): Promise<number> {
  process.stdout.write('  Getting number of pages...')
  const numberOfPages: number = await getNumberOfPages(url, debug).catch(catchErrorAndGTFO)
  process.stdout.write('\r✔ Getting number of pages... Done!\n')
  return numberOfPages
}
