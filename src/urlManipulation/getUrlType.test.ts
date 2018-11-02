import getUrlType from './getUrlType'

it('assignes the type correctly for basic situations', () => {
  const mockData = [
    ['https://www.flickr.com/photos/megane_wakui/', 'profile'],
    ['https://www.flickr.com/photos/megane_wakui', 'profile'],
    ['https://www.flickr.com/photos/megane_wakui/albums', 'albumList'],
    ['https://www.flickr.com/photos/megane_wakui/albums/', 'albumList'],
    ['https://www.flickr.com/photos/megane_wakui/albums/72157633145834761', 'album'],
    ['https://www.flickr.com/photos/megane_wakui/favorites', 'favorites'],
    ['https://www.flickr.com/photos/megane_wakui/favorites/', 'favorites'],
    ['https://www.flickr.com/photos/megane_wakui/44607621122/', 'photo'],
    ['https://www.flickr.com/photos/megane_wakui/44607621122', 'photo'],
  ]
  mockData.forEach(([url, output]) => {
    expect(getUrlType(url)).toEqual(output)
  })
})

it('implements `fixUrl` properly', () => {
  const mockData = [
    ['https://www.flickr.com/photos/dtt67/45588983952/in/explore-2018-10-30/', 'photo'],
    ['https://www.flickr.com/photos/megane_wakui/with/44607621122/', 'profile'],
    ['https://www.flickr.com/photos/joebranco/44705179515/in/explore-2018-10-29/', 'photo'],
    ['https://www.flickr.com/photos/dtt67/45588983952/in/explore-2018-10-30/', 'photo'],
    ['https://www.flickr.com/photos/oldroger/27963939197/in/faves-57803084@N07/', 'photo'],
  ]

  mockData.forEach(([url, output]) => {
    expect(getUrlType(url)).toEqual(output)
  })
})

/*
profile
photo
album
albumList
favorites
*/
