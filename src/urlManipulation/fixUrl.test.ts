import fixUrl from './fixUrl'

it('fixes the darn urls', () => {
  const mockData = [
    [
      'https://www.flickr.com/photos/andreassofus/30677591587/in/explore-2018-10-29/',
      'https://www.flickr.com/photos/andreassofus/30677591587',
    ],
    [
      'https://www.flickr.com/photos/megane_wakui/with/44607625822/',
      'https://www.flickr.com/photos/megane_wakui',
    ],
    [
      'https://www.flickr.com/photos/dtt67/45588983952/in/explore-2018-10-30/',
      'https://www.flickr.com/photos/dtt67/45588983952',
    ],
    [
      'https://www.flickr.com/photos/oldroger/27963939197/in/faves-57803084@N07/',
      'https://www.flickr.com/photos/oldroger/27963939197',
    ],
  ]

  mockData.forEach(([input, output]) => {
    expect(fixUrl(input)).toEqual(output)
  })
})

it('accepts link without "www"', () => {
  const mockData = [
    [
      'https://flickr.com/photos/andreassofus/30677591587/in/explore-2018-10-29/',
      'https://flickr.com/photos/andreassofus/30677591587',
    ],
    [
      'https://flickr.com/photos/megane_wakui/with/44607625822/',
      'https://flickr.com/photos/megane_wakui',
    ],
    [
      'https://flickr.com/photos/dtt67/45588983952/in/explore-2018-10-30/',
      'https://flickr.com/photos/dtt67/45588983952',
    ],
    [
      'https://flickr.com/photos/oldroger/27963939197/in/faves-57803084@N07/',
      'https://flickr.com/photos/oldroger/27963939197',
    ],
  ]

  mockData.forEach(([input, output]) => {
    expect(fixUrl(input)).toEqual(output)
  })
})
