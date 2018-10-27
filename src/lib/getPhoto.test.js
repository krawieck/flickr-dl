const getPhoto = require('./getPhoto')

beforeEach(() => jest.setTimeout(600000))

it('gets the png/jpg url and date right', async () => {
  // const data = [
  //   // TODO: MORE TESTS WITH MOCK DATA
  // ]
  const result = await getPhoto('https://www.flickr.com/photos/megane_wakui/44607625822/')

  expect(result).toBeInstanceOf(Object)
  expect(Object.keys(result).length).toEqual(2)
  expect(result[0]).toEqual('https://c2.staticflickr.com/2/1873/44607625822_03cacf8532_k.jpg')
  expect(result[1]).toEqual('2018-07-18.jpg')
})

it('knows when people try to fuck with it', async () => {
  expect(getPhoto('aerrngaejrngowenjhnbdzfkndfvjknkgo')).resolves.toBeInstanceOf(Error)
  expect(getPhoto('http://dnfkndf.com/qweqwe/1231232/')).resolves.toBeInstanceOf(Error)
})
