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
  if (argv['?'] || argv.h || argv.help) {
    console.log(`
gimmie url for flickr profile to download all of this person's photos

usage:    npm start -- <url>

 (warning: <url> has to start with "https://") 

optional parameters:
          --output  | -o <path>       outputs images to <path>, default is "img/"
          --debug   | -d              turns on debug mode, which basically just turn puppeteer's headless mode off
          --verbose | -v              spits out many a lot of information, which is pretty helpful while debugging 

examples: npm start -- https://www.flickr.com/photos/megane_wakui/`)
    process.exit()
  }
  // get all the variables
  const debug = !!argv.debug || !!argv.d
  const verbose = !!argv.verbose || !!argv.v

  const url = argv._[0]
  const dir = argv.output || argv.o || 'img/'
  // check if someone is a moron
  if (!url) {
    catchErrorAndGTFO('I need url to make something of it')
  }

  const typeOfUrl = getUrlType(url)
  if (verbose) console.log({ url, typeOfUrl, dir, argv })

  switch (typeOfUrl) {
    case 'photostream' || 'favorites': {
      const numOfPages = await getNumberOfPagesCLI(url, debug)
      const urls = await getUrlsFromPagesCLI(url, numOfPages, debug)
      await downloadPhotosCLI(urls, dir)
      break
    }

    case 'photo': {
      process.stdout.write('  Getting photo details... ')
      const [uri, name] = await getPhoto(url, debug).catch(catchErrorAndGTFO)
      process.stdout.write('\r✔ Getting photo details... Done!\n  Downloading... ')
      downloadPhoto(uri, name, dir)
        .catch(catchErrorAndGTFO)
        .then(e => process.stdout.write('\r✔ Downloading... Done!\n'))
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
})().catch(e => catchErrorAndGTFO('THE WHOLE APP FAILED', e))
