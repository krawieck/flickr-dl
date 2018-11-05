import getPhoto from '../urlManipulation/getPhoto'
import downloadPhoto from '../downloadPhoto'

export default async function downloadPhotosCLI(
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
      .then(e => downloadPhoto(e[0], e[1], dir)) // @TODO FIND OUT HOW TO REPLACE THAT WITH SPREAD OPERATOR WITHOUT TYPESCRIPT FUCKING FLIPPING OUT
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
