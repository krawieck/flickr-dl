module.exports = url =>
  /^(https:\/\/www\.flickr\.com\/.*?)(?:\/with\/\d+\/?|\/in\/[^\s/]+\/?)?$/.exec(url)[1]
