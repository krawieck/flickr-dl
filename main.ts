import getNumberOfPages from './src/urlManipulation/getNumberOfPages'
import getUrlsFromPages from './src/urlManipulation/getUrlsFromPages'
import getUrlType from './src/urlManipulation/getUrlType'
import getPhoto from './src/urlManipulation/getPhoto'
import downloadPhoto from './src/downloadPhoto'
import catchErrorAndGTFO from './src/catchErrorAndGTFO'
import getNumberOfPagesCLI from './src/CLI/getNumberOfPagesCLI'
import downloadPhotosCLI from './src/CLI/downloadPhotosCLI'
import getUrlsFromPagesCLI from './src/CLI/getUrlsFromPagesCLI'
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
