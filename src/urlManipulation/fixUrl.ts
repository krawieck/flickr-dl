export default (url: string): string => {
  const result = /^(https:\/\/(?:www\.)?flickr\.com\/.*?)(?:\/with\/\d+\/?|\/in\/[^\s/]+\/?)?$/.exec(
    url
  )
  return result ? result[1] : url
}
