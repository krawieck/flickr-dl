const request = require('request')
const fs = require('mz/fs')
const path = require('path')

const download = (uri, filename) =>
  new Promise((resolve, reject) => {
    let suffix = 0
    let {
      groups: { dir, name, ext }
    } = /^(?<dir>.*?)(?<name>[^\\/]*)\.(?<ext>\w+)$/.exec(filename)

    // create dir if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    // make sure to not overwrite any file
    let finalFilename = path.join(dir, `${name}.${ext}`)
    while (fs.existsSync(finalFilename)) {
      finalFilename = path.join(dir, `${name}_${++suffix}.${ext}`)
    }
    // start savin'
    request.head(uri, (err, res, body) => {
      if (err) return reject(err)
      request(uri)
        .pipe(fs.createWriteStream(finalFilename))
        .on('close', resolve)
    })
  })

module.exports = {
  download
}
