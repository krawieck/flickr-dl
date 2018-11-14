import getNumberOfPages from './src/urlManipulation/getNumberOfPages'
import getUrlsFromPages from './src/urlManipulation/getUrlsFromPages'
import getUrlType from './src/urlManipulation/getUrlType'
import getPhoto from './src/urlManipulation/getPhoto'
import downloadPhoto from './src/downloadPhoto'
import catchErrorAndGTFO from './src/catchErrorAndGTFO'
import getNumberOfPagesCLI from './src/CLI/getNumberOfPagesCLI'
import downloadPhotosCLI from './src/CLI/downloadPhotosCLI'
import getUrlsFromPagesCLI from './src/CLI/getUrlsFromPagesCLI'
import getWaterfallPhotosCLI from './src/CLI/getWaterfallUrlsCLI'
import getAlbumList from './src/urlManipulation/getAlbumList'
import getWaterfallUrls from './src/urlManipulation/getWaterfallUrls'
import fixUrl from './src/urlManipulation/fixUrl'
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

  const baseUrl = argv._[0]
  const dir = argv.output || argv.o || 'img/'
  // check if someone is a moron
  if (!baseUrl) {
    catchErrorAndGTFO('I need url to make something of it')
  }
  const url = fixUrl(baseUrl)
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
        .then(() => process.stdout.write('\r✔ Downloading... Done!\n'))
      break
    }

    case 'album': {
      const urls = await getWaterfallPhotosCLI(url).catch(catchErrorAndGTFO)
      await downloadPhotosCLI(urls, dir, debug).catch(catchErrorAndGTFO)
      console.log("seems like it's all done \\o/")
      break
    }

    case 'albumList': {
      process.stdout.write('  Getting album list... ')
      const urls: string[] = await getAlbumList(url).catch(catchErrorAndGTFO)
      process.stdout.write('\r✔ Getting album list... Done!\n')

      process.stdout.write('  Getting photos from albums... ')
      for (const [i, el] of Object.entries(urls)) {
        await getWaterfallUrls(el)
        process.stdout.write(
          `  Getting photos from albums... \
${String(Math.round(Number(i) / urls.length)).padStart(3)}%`
        )
      }
      break
    }

    default: {
      catchErrorAndGTFO("can't determine type of the url")
      break
    }
  }
})().catch(e => catchErrorAndGTFO('THE WHOLE APP FAILED', e))
