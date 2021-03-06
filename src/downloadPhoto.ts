import * as request from 'request'
import * as fs from 'mz/fs'
import * as path from 'path'

export default (uri: string, filename: string, dir: string = 'img/'): Promise<void> =>
  new Promise((resolve, reject) => {
    if (typeof uri !== 'string' || typeof filename !== 'string' || typeof dir !== 'string')
      reject(new TypeError('invalid arguments'))
    let suffix = 0
    let { groups } = /(?<name>[^\\/]*)\.(?<ext>\w+)$/.exec(filename) as RegExpExecArray
    // let { name, ext } = groups!
    let ext = groups ? groups.ext || '' : ''
    let name = groups ? groups.name || '' : ''
    // create dir if it doesn't exist
    if (!dir) dir = './'
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    // make sure to not overwrite any file
    let finalFilename: string = path.join(dir, `${name}.${ext}`)
    while (fs.existsSync(finalFilename)) {
      finalFilename = path.join(dir, `${name}_${++suffix}.${ext}`)
    }
    // start savin'
    request.head(uri, (err: Error) => {
      if (err) return reject(err)
      return request(uri)
        .pipe(fs.createWriteStream(finalFilename))
        .on('close', resolve)
    })
  })
