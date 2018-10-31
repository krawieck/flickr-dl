const fixUrl = require('./fixUrl')

module.exports = url => {
  url = fixUrl(url)
  for (const [type, regex] of Object.entries(regexes)) {
    if (regex.test(url)) {
      return type
    }
  }
  return undefined
}

const regexes = {
  profile: /^https:\/\/www.flickr.com\/photos\/[^\\/\s]+\/?$/,
  photo: /^https:\/\/www.flickr.com\/photos\/[^\\/\s]+\/\d+\/?$/,
  album: /^https:\/\/www.flickr.com\/photos\/[^\\/\s]+\/albums\/\d+\/?$/,
  albumList: /^https:\/\/www.flickr.com\/photos\/[^\\/\s]+\/albums\/?$/,
  favorites: /^https:\/\/www.flickr.com\/photos\/[^\\/\s]+\/favorites\/?$/,
}

/*

profile
photo
album
albumList
favorites

*/
