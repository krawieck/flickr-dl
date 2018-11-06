import getWaterfallUrls from '../urlManipulation/getWaterfallUrls'

export default function getWaterfallPhotosCLI(url: string): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    process.stdout.write('  Getting URLs... ')
    getWaterfallUrls(url)
      .then(result => {
        process.stdout.write('\r✔ Getting URLs... Done!\n')
        resolve(result)
      })
      .catch(reject)
  })
}
