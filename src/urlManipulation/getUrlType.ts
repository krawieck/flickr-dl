import fixUrl from './fixUrl'

/**
 * Finds out what type of url is it
 *
 * Possible types are: "profile", "photo", "album", "albumList" and "favorites".
 */
const getUrlType = (url: string): string | undefined => {
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

export default getUrlType

/*
profile
photo
album
albumList
favorites
*/
