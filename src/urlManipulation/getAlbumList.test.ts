import getAlbumList from './getAlbumList'

describe('getAlbumList', () => {
  it('gets the URLs from albums page', () => {
    const mockData: Array<[string, string[]]> = [
      // IF TEST IS NOT WORKIN CHECK IF ALBUM LIST ON WEBPAGE HAS CHANGED
      [
        'https://www.flickr.com/photos/megane_wakui/albums/',
        [
          'https://www.flickr.com/photos/megane_wakui/albums/72157633145834761',
          'https://www.flickr.com/photos/megane_wakui/albums/72157631981970736',
          'https://www.flickr.com/photos/megane_wakui/albums/72157629969326146',
          'https://www.flickr.com/photos/megane_wakui/albums/72157629212758502',
          'https://www.flickr.com/photos/megane_wakui/albums/72157629182151196',
          'https://www.flickr.com/photos/megane_wakui/albums/72157629873613493',
          'https://www.flickr.com/photos/megane_wakui/albums/72157629482157007',
          'https://www.flickr.com/photos/megane_wakui/albums/72157632915198574',
        ],
      ],
    ]
    mockData.forEach(([input, output]) => {
      expect(getAlbumList(input)).resolves.toEqual(output)
    })
  })
})
