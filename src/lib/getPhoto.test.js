const getPhoto = require('./getPhoto')

beforeEach(() => jest.setTimeout(600000))

it('gets the png/jpg url and date right', async () => {
  const mockData = [
    [
      'https://www.flickr.com/photos/megane_wakui/44607625822/',
      ['https://c2.staticflickr.com/2/1873/44607625822_03cacf8532_k.jpg', '2018-07-18.jpg']
    ] // TODO: MORE TESTS WITH MOCK DATA
  ]

  for (const [input, output] of mockData) {
    // console.log({ input, output })
    const result = await getPhoto(input)
    expect(result).toEqual(output)
  }
})

it('knows when people try to fuck with it', async () => {
  expect(getPhoto('aerrngaejrngowenjhnbdzfkndfvjknkgo')).rejects.toBeInstanceOf(Error)
  expect(getPhoto('http://dnfkndf.com/qweqwe/1231232/')).rejects.toBeInstanceOf(Error)
})
