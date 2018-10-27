const dlPhoto = require('./dlPhoto')
const crypto = require('crypto')
const downloadMock = [['https://c1.staticflickr.com/5/4667/40457760392_f2686988c9_k.jpg']]

function generateChecksum (str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}

it('downloads the image', () => {
  dlPhoto('https://c1.staticflickr.com/5/4667/40457760392_f2686988c9_k.jpg')
})

it('names it properly', () => {})
